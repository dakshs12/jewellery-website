import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { Order, OrderLineItem } from "@/types/database";
import { sendOrderConfirmationEmails } from "@/lib/email/service";
import { writeClient } from "@/lib/sanity/client";

async function decrementProductStock(lineItems: OrderLineItem[]) {
  const qtyByProduct = new Map<string, number>();

  for (const item of lineItems) {
    if (!item.product_id) continue;
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    qtyByProduct.set(item.product_id, (qtyByProduct.get(item.product_id) || 0) + qty);
  }

  for (const [productId, purchasedQty] of qtyByProduct.entries()) {
    const publishedId = productId.replace(/^drafts\./, "");
    const draftId = `drafts.${publishedId}`;

    // Retry up to 2 times in case of a concurrent optimistic-lock (_rev) conflict
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const docs = await writeClient.fetch<
          Array<{
            _id: string;
            _rev: string;
            stockQuantity?: number | null;
            inStock?: boolean;
          }>
        >(
          `*[_type == "product" && (_id in [$publishedId, $draftId] || slug.current == $productId)]{ _id, _rev, stockQuantity, inStock }`,
          { publishedId, draftId, productId }
        );

        if (!docs || docs.length === 0) break;

        for (const doc of docs) {
          if (typeof doc.stockQuantity !== "number" || Number.isNaN(doc.stockQuantity)) {
            continue;
          }

          const nextQty = Math.max(0, Math.floor(doc.stockQuantity) - purchasedQty);
          const updates: { stockQuantity: number; inStock?: boolean } = {
            stockQuantity: nextQty,
          };

          if (nextQty <= 0) {
            updates.inStock = false;
          }

          await writeClient
            .patch(doc._id)
            .ifRevisionId(doc._rev)
            .set(updates)
            .commit();
        }

        break;
      } catch (err) {
        if (attempt === 1) {
          console.error(
            `[Sanity Stock Decrement Error] Failed for ${productId}:`,
            err
          );
        }
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderNumber,
      customerDetails,
      lineItems,
      totalAmount,
      // Backward compatibility fallbacks
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      line_items,
      total_amount,
    } = body;

    const finalCustomerName =
      customerDetails?.name || customerDetails?.customer_name || customer_name;
    const finalCustomerEmail =
      customerDetails?.email || customerDetails?.customer_email || customer_email;
    const finalCustomerPhone =
      customerDetails?.phone || customerDetails?.customer_phone || customer_phone;
    const finalShippingAddress =
      customerDetails?.shipping_address ||
      customerDetails?.address ||
      shipping_address;
    const finalLineItems = lineItems || line_items;
    const finalTotalAmount = Number(totalAmount || total_amount || 0);

    if (
      !finalCustomerName ||
      !finalCustomerEmail ||
      !finalCustomerPhone ||
      !finalShippingAddress ||
      !finalLineItems ||
      finalLineItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required order information." },
        { status: 400 }
      );
    }

    // 1. Cryptographic Signature Verification
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: "Missing Razorpay payment verification parameters." },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { error: "Invalid payment signature. Cryptographic verification failed." },
          { status: 400 }
        );
      }
    }

    // 2. Human-readable order number & unique internal order UUID
    const finalOrderNumber =
      orderNumber || `ANA-${Date.now().toString().slice(-6)}`;
    const order_id = crypto.randomUUID();

    const normalizedLineItems: OrderLineItem[] = finalLineItems.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        product_id: item.productId || item.product_id || item.id || "",
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || "/products/necklace/necklace-01.jpg",
      })
    );

    const newOrder: Order = {
      id: order_id,
      order_number: finalOrderNumber,
      customer_name: finalCustomerName,
      customer_email: finalCustomerEmail,
      customer_phone: finalCustomerPhone,
      shipping_address: {
        street: finalShippingAddress.street,
        city: finalShippingAddress.city,
        state: finalShippingAddress.state,
        postal_code:
          finalShippingAddress.postal_code ||
          finalShippingAddress.postalCode ||
          "",
      },
      line_items: normalizedLineItems,
      total_amount: finalTotalAmount,
      razorpay_order_id: razorpay_order_id || `order_manual_${Date.now()}`,
      razorpay_payment_id: razorpay_payment_id || `pay_manual_${Date.now()}`,
      status: "paid",
      courier_name: "BlueDart",
      tracking_number: null,
      tracking_url: null,
      created_at: new Date().toISOString(),
    };

    // 3. Write Verified Paid Order to Sanity CMS & Deduct Live Stock Quantities
    let sanityOrderDocId: string | null = null;
    if (
      process.env.SANITY_API_WRITE_TOKEN &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "dummy-project-id"
    ) {
      try {
        const orderDocId = `order-${finalOrderNumber.toLowerCase()}`;
        const existingOrderId = await writeClient.fetch<string | null>(
          `*[_type == "order" && (_id == $orderDocId || razorpayPaymentId == $paymentId)][0]._id`,
          {
            orderDocId,
            paymentId: newOrder.razorpay_payment_id,
          }
        );

        const sanityDoc = {
          _type: "order",
          _id: orderDocId,
          orderNumber: finalOrderNumber,
          status: "paid",
          courierName: "BlueDart",
          customerName: finalCustomerName,
          customerEmail: finalCustomerEmail,
          customerPhone: finalCustomerPhone,
          shippingAddress: {
            street: finalShippingAddress.street,
            city: finalShippingAddress.city,
            state: finalShippingAddress.state,
            postalCode:
              finalShippingAddress.postal_code ||
              finalShippingAddress.postalCode ||
              "",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          lineItems: normalizedLineItems.map((item: any, idx: number) => ({
            _key: `item-${idx}-${item.product_id || idx}`,
            productId: item.product_id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totalAmount: finalTotalAmount,
          razorpayOrderId: newOrder.razorpay_order_id,
          razorpayPaymentId: newOrder.razorpay_payment_id,
          createdAt: newOrder.created_at,
        };

        const sanityRes = await writeClient.createOrReplace(sanityDoc);
        sanityOrderDocId = sanityRes._id;

        // Deduct product stock only on first persistence of this verified payment
        if (!existingOrderId) {
          await decrementProductStock(normalizedLineItems);
          try {
            revalidatePath("/products");
            revalidatePath("/");
          } catch {
            // ignore revalidation errors in non-request contexts
          }
        }
      } catch (sanityErr) {
        console.error("[Sanity Order Persistence Error]:", sanityErr);
      }
    }

    // 4. Trigger Transactional Emails (Customer Confirmation & Store Alert)
    const origin =
      req.headers.get("origin") ||
      req.nextUrl?.origin ||
      "https://anayasjewels.com";
    const emailResult = await sendOrderConfirmationEmails(newOrder, origin);

    return NextResponse.json({
      success: true,
      order: newOrder,
      sanityOrderId: sanityOrderDocId,
      emailResult,
      message: "Order successfully verified, saved, and confirmed.",
    });
  } catch (error: unknown) {
    console.error("[Create Order Verification Error]:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to verify and create order.",
      },
      { status: 500 }
    );
  }
}

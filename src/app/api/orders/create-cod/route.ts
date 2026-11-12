import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { Order, OrderLineItem } from "@/types/database";
import { getProducts } from "@/lib/sanity/queries";
import { writeClient } from "@/lib/sanity/client";
import { decrementProductStock } from "@/lib/sanity/inventory";
import { sendOrderConfirmationEmails } from "@/lib/email/service";
import {
  COD_FEE,
  MAX_COD_AMOUNT,
  computeShippingFee,
} from "@/lib/checkoutConfig";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerDetails, items } = body;

    if (!customerDetails || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or shipping details are missing." },
        { status: 400 }
      );
    }

    // 1. Validate Customer & Address Fields
    const name = String(customerDetails.name || "").trim();
    const email = String(customerDetails.email || "").trim();
    const rawPhone = String(customerDetails.phone || "").trim();
    const shipping = customerDetails.shipping_address || customerDetails.address || {};
    const street = String(shipping.street || "").trim();
    const city = String(shipping.city || "").trim();
    const state = String(shipping.state || "").trim();
    const postalCode = String(
      shipping.postal_code || shipping.postalCode || ""
    ).trim();

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanPhone = rawPhone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    if (street.length < 5) {
      return NextResponse.json(
        { error: "Please provide a complete delivery street address." },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json({ error: "Please enter your city." }, { status: 400 });
    }

    if (!state) {
      return NextResponse.json({ error: "Please enter your state." }, { status: 400 });
    }

    if (!/^\d{6}$/.test(postalCode)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit Indian PIN code." },
        { status: 400 }
      );
    }

    // 2. Server-Side Price, Live Stock & ₹1,500 Cap Verification
    const allProducts = await getProducts();
    const requestedQtyByProductId = new Map<
      string,
      { product: (typeof allProducts)[number]; quantity: number }
    >();

    for (const item of items) {
      const requestedId =
        item.productId || item.product?.id || item.id || item.slug;
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));

      const product = allProducts.find(
        (p) => p.id === requestedId || p.slug === requestedId
      );

      if (!product) {
        return NextResponse.json(
          { error: `Jewellery item "${requestedId}" could not be found in our catalogue.` },
          { status: 400 }
        );
      }

      const prev = requestedQtyByProductId.get(product.id);
      requestedQtyByProductId.set(product.id, {
        product,
        quantity: (prev?.quantity || 0) + quantity,
      });
    }

    const normalizedLineItems: OrderLineItem[] = [];
    let subtotal = 0;

    for (const { product, quantity } of requestedQtyByProductId.values()) {
      if (
        product.in_stock === false ||
        (typeof product.stock_quantity === "number" && product.stock_quantity <= 0)
      ) {
        return NextResponse.json(
          {
            error: `"${product.title}" is currently out of stock. Please remove it from your bag to continue.`,
          },
          { status: 400 }
        );
      }

      if (
        typeof product.stock_quantity === "number" &&
        quantity > product.stock_quantity
      ) {
        return NextResponse.json(
          {
            error: `Only ${product.stock_quantity} piece${product.stock_quantity === 1 ? "" : "s"} of "${product.title}" left in stock. Please adjust the quantity in your bag.`,
          },
          { status: 400 }
        );
      }

      const activePrice = product.sale_price ?? product.price;
      subtotal += activePrice * quantity;

      normalizedLineItems.push({
        product_id: product.id,
        title: product.title,
        price: activePrice,
        quantity,
        image: product.images[0] || "/products/necklace/necklace-01.jpg",
      });
    }

    if (subtotal > MAX_COD_AMOUNT) {
      return NextResponse.json(
        {
          error: `Cash on Delivery is only available for orders up to ₹${MAX_COD_AMOUNT.toLocaleString("en-IN")}.`,
        },
        { status: 400 }
      );
    }

    const shippingFee = computeShippingFee(subtotal);
    const totalAmount = subtotal + shippingFee + COD_FEE;

    // 3. Generate unique Order Number & Build Order Record
    const finalOrderNumber = `ANA-${Date.now().toString().slice(-6)}`;
    const orderId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      order_number: finalOrderNumber,
      customer_name: name,
      customer_email: email,
      customer_phone: cleanPhone,
      shipping_address: {
        street,
        city,
        state,
        postal_code: postalCode,
      },
      line_items: normalizedLineItems,
      total_amount: totalAmount,
      payment_method: "Cash on Delivery (COD)",
      cod_fee: COD_FEE,
      razorpay_order_id: "COD",
      razorpay_payment_id: "Pay on Delivery",
      status: "cod_confirmed",
      courier_name: "BlueDart",
      tracking_number: null,
      tracking_url: null,
      created_at: createdAt,
    };

    // 4. Persist COD Order to Sanity CMS & Deduct Live Stock Quantities
    if (
      process.env.SANITY_API_WRITE_TOKEN &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "dummy-project-id"
    ) {
      const orderDocId = `order-${finalOrderNumber.toLowerCase()}`;
      const sanityDoc = {
        _type: "order",
        _id: orderDocId,
        orderNumber: finalOrderNumber,
        paymentMethod: "Cash on Delivery (COD)",
        status: "cod_confirmed",
        courierName: "BlueDart",
        customerName: name,
        customerEmail: email,
        customerPhone: cleanPhone,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
        },
        lineItems: normalizedLineItems.map((item, idx) => ({
          _key: `item-${idx}-${item.product_id || idx}`,
          productId: item.product_id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount,
        razorpayOrderId: "COD",
        razorpayPaymentId: "Pay on Delivery",
        createdAt,
      };

      await writeClient.createOrReplace(sanityDoc);
      await decrementProductStock(normalizedLineItems);

      try {
        revalidatePath("/products");
        revalidatePath("/");
      } catch {
        // ignore revalidation errors in non-request contexts
      }
    }

    // 5. Fire Non-Blocking Resend Confirmation & Admin Alert Emails
    const origin =
      req.headers.get("origin") ||
      req.nextUrl?.origin ||
      "https://anayasjewels.com";

    try {
      await sendOrderConfirmationEmails(newOrder, origin);
    } catch (emailErr) {
      console.warn("[COD Email Warning] Non-critical email error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      orderNumber: finalOrderNumber,
      totalAmount,
      order: newOrder,
    });
  } catch (error: unknown) {
    console.error("[Create COD Order Error]:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to place Cash on Delivery order.",
      },
      { status: 500 }
    );
  }
}


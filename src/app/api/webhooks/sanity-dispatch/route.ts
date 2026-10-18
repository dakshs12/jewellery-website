import { NextRequest, NextResponse } from "next/server";
import { sendOrderDispatchedEmail } from "@/lib/email/service";
import { client, writeClient } from "@/lib/sanity/client";
import { Order } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const authHeader =
        req.headers.get("x-sanity-webhook-secret") ||
        req.headers.get("authorization");
      if (
        authHeader &&
        authHeader !== webhookSecret &&
        authHeader !== `Bearer ${webhookSecret}`
      ) {
        return NextResponse.json(
          { error: "Unauthorized webhook caller: Invalid secret." },
          { status: 401 }
        );
      }
    }

    const body = await req.json();
    const orderData = body.order || body.payload || body;

    const orderId =
      orderData.orderId ||
      orderData._id ||
      orderData.id;
    const orderNumber =
      orderData.orderNumber ||
      orderData.order_number;

    let targetEmail =
      orderData.customerEmail ||
      orderData.customer_email;
    let customerName =
      orderData.customerName ||
      orderData.customer_name;
    let courierName =
      orderData.courierName ||
      orderData.courier_name ||
      "BlueDart";
    let trackingNumber =
      orderData.trackingNumber ||
      orderData.tracking_number;
    let trackingUrl =
      orderData.trackingUrl ||
      orderData.tracking_url;
    let shippingAddress =
      orderData.shippingAddress ||
      orderData.shipping_address;
    let lineItems =
      orderData.lineItems ||
      orderData.line_items ||
      [];
    let totalAmount =
      orderData.totalAmount ||
      orderData.total_amount ||
      0;

    let sanityDocId = orderId;

    // If only orderId or orderNumber was passed, fetch the complete document from Sanity
    if ((!targetEmail || !trackingNumber) && (orderId || orderNumber)) {
      try {
        const query = orderId
          ? `*[_type == "order" && (_id == $id || _id == $altId)][0]`
          : `*[_type == "order" && orderNumber == $orderNumber][0]`;
        const params = orderId
          ? { id: orderId, altId: `order-${orderId.toLowerCase()}` }
          : { orderNumber };

        const fetched = await client.fetch(query, params);

        if (fetched) {
          sanityDocId = fetched._id;
          targetEmail = targetEmail || fetched.customerEmail;
          customerName = customerName || fetched.customerName;
          courierName = courierName || fetched.courierName || "BlueDart";
          trackingNumber = trackingNumber || fetched.trackingNumber;
          trackingUrl =
            trackingUrl ||
            fetched.trackingUrl ||
            `https://www.bluedart.com/tracking?track=${fetched.trackingNumber}`;
          shippingAddress = shippingAddress || fetched.shippingAddress;
          lineItems = lineItems.length > 0 ? lineItems : fetched.lineItems || [];
          totalAmount = totalAmount || fetched.totalAmount || 0;
        }
      } catch (fetchErr) {
        console.warn("[Sanity Dispatch Fetch Notice]:", fetchErr);
      }
    }

    if (!trackingNumber) {
      return NextResponse.json(
        {
          error:
            "Missing courier tracking number. Please provide trackingNumber to notify the customer.",
        },
        { status: 400 }
      );
    }

    if (!targetEmail) {
      return NextResponse.json(
        {
          error:
            "Missing recipient email address. Could not find customer email for this order.",
        },
        { status: 400 }
      );
    }

    const finalTrackingUrl =
      trackingUrl ||
      `https://www.bluedart.com/tracking?track=${encodeURIComponent(trackingNumber)}`;

    const orderPayload: Order = {
      id: orderId || "order_dispatched",
      order_number: orderNumber || "ANA-DISPATCHED",
      customer_name: customerName || "Valued Client",
      customer_email: targetEmail,
      customer_phone: orderData.customerPhone || orderData.customer_phone || "",
      shipping_address: {
        street: shippingAddress?.street || "Shipping Address",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
        postal_code:
          shippingAddress?.postalCode ||
          shippingAddress?.postal_code ||
          "",
      },
      line_items: lineItems,
      total_amount: Number(totalAmount),
      razorpay_order_id: orderData.razorpayOrderId || "rzp_order",
      razorpay_payment_id: orderData.razorpayPaymentId || "rzp_pay",
      status: "dispatched",
      courier_name: courierName,
      tracking_number: trackingNumber,
      tracking_url: finalTrackingUrl,
      created_at: orderData.createdAt || new Date().toISOString(),
    };

    // 1. Send Dispatched Email via Resend
    const emailResult = await sendOrderDispatchedEmail(orderPayload);

    // 2. Patch Sanity Order document: set status="dispatched", trackingEmailSent=true, dispatchedAt
    let sanityPatched = false;
    if (
      sanityDocId &&
      process.env.SANITY_API_WRITE_TOKEN &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "dummy-project-id"
    ) {
      const publishedId = sanityDocId.replace(/^drafts\./, "");
      const draftId = `drafts.${publishedId}`;

      try {
        await writeClient
          .patch(publishedId)
          .set({
            status: "dispatched",
            courierName,
            trackingNumber,
            trackingUrl: finalTrackingUrl,
            trackingEmailSent: true,
            dispatchedAt: new Date().toISOString(),
          })
          .commit();
        sanityPatched = true;
      } catch (patchErr) {
        console.warn("[Sanity Dispatch Published Patch]:", patchErr);
      }

      try {
        await writeClient
          .patch(draftId)
          .set({
            status: "dispatched",
            courierName,
            trackingNumber,
            trackingUrl: finalTrackingUrl,
            trackingEmailSent: true,
            dispatchedAt: new Date().toISOString(),
          })
          .commit();
      } catch {
        // Draft might not exist, which is expected
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber: orderPayload.order_number,
      courierName,
      trackingNumber,
      trackingUrl: finalTrackingUrl,
      emailResult,
      sanityPatched,
      message: `Order #${orderPayload.order_number} marked as dispatched and tracking email dispatched via ${courierName}.`,
    });
  } catch (error: unknown) {
    console.error("[Sanity Dispatch Webhook Error]:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process dispatch webhook.",
      },
      { status: 500 }
    );
  }
}

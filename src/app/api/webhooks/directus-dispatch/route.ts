import { NextRequest, NextResponse } from "next/server";
import { sendOrderDispatchedEmail } from "@/lib/email/service";
import { Order } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("x-directus-webhook-secret") || req.headers.get("authorization");
    const secretKey = process.env.DIRECTUS_WEBHOOK_SECRET || "anayas_directus_secret_demo";

    // Validate secret key
    if (authHeader && authHeader !== secretKey && authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json({ error: "Unauthorized webhook caller" }, { status: 401 });
    }

    const body = await req.json();

    // Directus sends payload for item update or custom webhook payload
    const orderData: Partial<Order> = body.order || body.payload || body;

    if (!orderData.customer_email || !orderData.order_number) {
      return NextResponse.json(
        { error: "Invalid order payload: missing customer_email or order_number" },
        { status: 400 }
      );
    }

    const order: Order = {
      id: orderData.id || "demo-order-id",
      order_number: orderData.order_number,
      customer_name: orderData.customer_name || "Valued Client",
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone || "+91 9999999999",
      shipping_address: orderData.shipping_address || {
        street: "Artisan Residency",
        city: "Mumbai",
        state: "Maharashtra",
        postal_code: "400001",
      },
      line_items: orderData.line_items || [],
      total_amount: orderData.total_amount || 0,
      razorpay_order_id: orderData.razorpay_order_id || "order_mock",
      razorpay_payment_id: orderData.razorpay_payment_id || "pay_mock",
      status: "dispatched",
      courier_name: orderData.courier_name || "BlueDart",
      tracking_number: orderData.tracking_number || "BLUEDART-EXP-10928",
      tracking_url:
        orderData.tracking_url ||
        `https://www.bluedart.com/tracking?track=${orderData.tracking_number || "BLUEDART-EXP-10928"}`,
      created_at: orderData.created_at || new Date().toISOString(),
    };

    const emailResult = await sendOrderDispatchedEmail(order);

    return NextResponse.json({
      success: true,
      order_number: order.order_number,
      status: "dispatched",
      emailResult,
    });
  } catch (error) {
    console.error("[Directus Dispatch Webhook Error]:", error);
    return NextResponse.json(
      { error: "Internal server error processing webhook" },
      { status: 500 }
    );
  }
}

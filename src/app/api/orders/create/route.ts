import { NextRequest, NextResponse } from "next/server";
import { Order, OrderLineItem } from "@/types/database";
import { sendOrderConfirmationEmails } from "@/lib/email/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      line_items,
      total_amount,
    } = body;

    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !shipping_address ||
      !line_items ||
      line_items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required order information." },
        { status: 400 }
      );
    }

    // Generate luxurious order number: ANA-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const order_number = `ANA-${randomSuffix}`;
    const order_id = crypto.randomUUID();

    // Mock Razorpay payment IDs (ready for live keys or instant testing)
    const razorpay_order_id = `order_rzp_${Date.now()}`;
    const razorpay_payment_id = `pay_rzp_${Math.random().toString(36).substring(2, 10)}`;

    const newOrder: Order = {
      id: order_id,
      order_number,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      line_items: line_items.map((item: OrderLineItem) => ({
        product_id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total_amount: Number(total_amount),
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      courier_name: "BlueDart",
      tracking_number: null,
      tracking_url: null,
      created_at: new Date().toISOString(),
    };

    // Trigger transactional emails (Customer Confirmation & Admin Alert)
    const emailResult = await sendOrderConfirmationEmails(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
      emailResult,
      message: "Order successfully placed and confirmed.",
    });
  } catch (error) {
    console.error("[Create Order Error]:", error);
    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    );
  }
}

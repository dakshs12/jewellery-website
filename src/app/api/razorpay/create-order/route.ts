import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getProducts } from "@/lib/sanity/queries";

export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 199;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty. Please add items before proceeding to checkout." },
        { status: 400 }
      );
    }

    // 1. Fetch live products from Sanity (with fallback to mockProducts.ts)
    const allProducts = await getProducts();

    // 2. Server-side price & stock verification
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verifiedItems: any[] = [];
    let subtotal = 0;

    for (const item of items) {
      const requestedId = item.productId || item.product?.id || item.id || item.slug;
      const quantity = Math.max(1, Number(item.quantity) || 1);

      const product = allProducts.find(
        (p) => p.id === requestedId || p.slug === requestedId
      );

      if (!product) {
        return NextResponse.json(
          { error: `Jewellery item "${requestedId}" could not be found in our catalogue.` },
          { status: 400 }
        );
      }

      if (product.in_stock === false) {
        return NextResponse.json(
          {
            error: `"${product.title}" is currently out of stock. Please remove it from your bag to continue.`,
          },
          { status: 400 }
        );
      }

      const activePrice = product.sale_price ?? product.price;
      subtotal += activePrice * quantity;

      verifiedItems.push({
        productId: product.id,
        title: product.title,
        price: activePrice,
        quantity,
        image: product.images[0] || "/products/necklace/necklace-01.jpg",
      });
    }

    // 3. Compute accurate shipping and final total in INR
    const shippingFee =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const totalAmount = subtotal + shippingFee;
    const amountInPaise = Math.round(totalAmount * 100);

    // 4. Generate human-readable luxury order reference (e.g. ANA-189284)
    const orderNumber = `ANA-${Date.now().toString().slice(-6)}`;

    // 5. Razorpay Server Order Initialization
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          error: "Razorpay credentials are not configured.",
          instructions:
            "Please add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file to activate live Razorpay checkouts.",
        },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: orderNumber,
      notes: {
        orderNumber,
        itemCount: verifiedItems.length.toString(),
      },
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId: rzpOrder.id,
      amount: amountInPaise,
      currency: "INR",
      orderNumber,
      totalAmount,
      subtotal,
      shippingFee,
      verifiedItems,
    });
  } catch (error: unknown) {
    console.error("[Razorpay Create Order Error]:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize payment gateway order.",
      },
      { status: 500 }
    );
  }
}

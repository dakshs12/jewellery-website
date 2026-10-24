"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  CheckCircle2,
  PackageCheck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types/database";
import {
  RazorpayOptions,
  RazorpaySuccessResponse,
  RazorpayFailureResponse,
} from "@/types/razorpay";

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dynamically load Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function GuestCheckoutModal({
  isOpen,
  onClose,
}: GuestCheckoutModalProps) {
  const { items, subtotal, shippingFee, finalTotal, clearCart } =
    useHydratedCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentStatusText, setPaymentStatusText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  // Preload Razorpay checkout script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadRazorpayScript();
      setErrorMessage(null);
    }
  }, [isOpen]);

  // Form Validation
  const validateForm = (): string | null => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return "Please enter a valid full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address for your invoice and courier tracking.";
    }

    // Clean phone number (strip spaces, dashes, +91)
    const cleanPhone = formData.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      return "Please enter a valid 10-digit mobile number for courier delivery.";
    }

    if (!formData.street.trim() || formData.street.trim().length < 5) {
      return "Please provide a complete street address with building / apartment details.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.state.trim()) {
      return "Please enter your state.";
    }

    if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      return "Please enter a valid 6-digit Indian PIN code.";
    }

    return null;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Your bag is empty. Please add items before checking out.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    setPaymentStatusText("Verifying bag & initializing Razorpay...");

    try {
      // 1. Ensure Razorpay client SDK is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error(
          "Could not load Razorpay gateway. Please check your internet connection and try again."
        );
      }

      // 2. Call server-side order initialization (/api/razorpay/create-order)
      const initRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      const initData = await initRes.json();

      if (!initRes.ok || !initData.success) {
        throw new Error(
          initData.error ||
          initData.instructions ||
          "Failed to initialize payment gateway order."
        );
      }

      const {
        razorpayOrderId,
        amount,
        currency,
        orderNumber,
        verifiedItems,
        totalAmount,
      } = initData;

      setPaymentStatusText("Awaiting Razorpay payment completion...");

      // 3. Configure and launch Razorpay checkout modal
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount,
        currency: currency || "INR",
        name: "Anayas Jewels",
        description: `Order #${orderNumber}`,
        image: "/5.svg",
        order_id: razorpayOrderId,
        handler: async (response: RazorpaySuccessResponse) => {
          setPaymentStatusText("Cryptographically verifying payment & creating order...");
          try {
            const confirmRes = await fetch("/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderNumber,
                customerDetails: {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  shipping_address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postal_code: formData.postalCode,
                  },
                },
                lineItems: verifiedItems,
                totalAmount,
              }),
            });

            const confirmData = await confirmRes.json();

            if (!confirmRes.ok || !confirmData.success) {
              throw new Error(
                confirmData.error || "Payment signature verification failed."
              );
            }

            // Order success!
            setCompletedOrder(confirmData.order);
            clearCart();

            // Trigger celebratory gold confetti
            try {
              confetti({
                particleCount: 90,
                spread: 80,
                origin: { y: 0.6 },
                colors: ["#D4AF37", "#C5A059", "#E8D7D0", "#1C1917"],
              });
            } catch {
              // ignore canvas errors
            }
          } catch (err: unknown) {
            console.error("Order verification error:", err);
            setErrorMessage(
              err instanceof Error
                ? err.message
                : "Failed to confirm order after payment. Please contact our support team."
            );
          } finally {
            setLoading(false);
            setPaymentStatusText(null);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#1C1917",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setPaymentStatusText(null);
            setErrorMessage(
              "Payment window was closed. Your shipping details are saved — you can click 'Proceed to Pay' when you're ready."
            );
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded.");
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp: RazorpayFailureResponse) => {
        setLoading(false);
        setPaymentStatusText(null);
        setErrorMessage(
          resp.error?.description ||
          "Payment failed with your bank or UPI provider. Please try again."
        );
      });

      rzp.open();
    } catch (err: unknown) {
      console.error("Checkout submission failed:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during checkout."
      );
      setLoading(false);
      setPaymentStatusText(null);
    }
  };

  const handleSimulateSanityDispatch = async () => {
    if (!completedOrder) return;
    setDispatchLoading(true);
    try {
      const res = await fetch("/api/webhooks/sanity-dispatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: completedOrder.id,
          orderNumber: completedOrder.order_number,
          customerName: completedOrder.customer_name,
          customerEmail: completedOrder.customer_email,
          customerPhone: completedOrder.customer_phone,
          courierName: "BlueDart",
          trackingNumber: "BLUEDART-EXP-98218",
          trackingUrl:
            "https://www.bluedart.com/tracking?track=BLUEDART-EXP-98218",
          shippingAddress: completedOrder.shipping_address,
          lineItems: completedOrder.line_items,
          totalAmount: completedOrder.total_amount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDispatchStatus("Parcel dispatched via BlueDart! Tracking email delivered & Sanity order patched.");
      } else {
        setDispatchStatus(`Dispatch notice: ${data.error || "Completed"}`);
      }
    } catch {
      setDispatchStatus("Dispatch webhook simulated.");
    } finally {
      setDispatchLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!loading) onClose();
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-4xl bg-[#FFF6EA] border border-[#E9E3DB] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E9E3DB] flex items-center justify-between bg-[#FFF6EA]">
              <div className="flex items-center gap-3">
                {completedOrder ? (
                  <CheckCircle2 className="w-5 h-5 text-[#2D4F3E]" />
                ) : (
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                )}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                    {completedOrder ? "Order Confirmed" : "Checkout"}
                  </h3>
                  {completedOrder && (
                    <p className="text-xs text-[#78716C]">
                      Order Reference: {completedOrder.order_number}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F3EFEA] text-[#1C1917] transition-colors focus:ring-2 focus:ring-[#C5A059] disabled:opacity-40"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              {completedOrder ? (
                /* ORDER CONFIRMATION VIEW */
                <div className="max-w-2xl mx-auto text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#E8D7D0] text-[#1C1917] flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-[#2D4F3E]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
                    Payment Verified via Razorpay
                  </span>
                  <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mb-3">
                    Order <span className="font-sans font-semibold tracking-wide">#{completedOrder.order_number}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#78716C] leading-relaxed mb-6 bg-white p-4 rounded-2xl border border-[#E9E3DB]">
                    Thank you for shopping with Anayas. Your order is confirmed and our artisans are preparing it. We will email your courier tracking link as soon as it is dispatched.
                  </p>

                  {/* Summary card */}
                  <div className="bg-[#F3EFEA] rounded-2xl p-5 border border-[#E9E3DB] text-left mb-6 space-y-3">
                    <div className="flex justify-between text-xs border-b border-[#E9E3DB] pb-3">
                      <span className="text-[#78716C]">Recipient</span>
                      <span className="font-semibold text-[#1C1917]">
                        {completedOrder.customer_name} ({completedOrder.customer_phone})
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-[#E9E3DB] pb-3">
                      <span className="text-[#78716C]">Payment Reference</span>
                      <span className="font-mono text-[11px] text-[#1C1917]">
                        {completedOrder.razorpay_payment_id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-1">
                      <span className="font-serif font-bold text-[#1C1917]">Total Paid</span>
                      <span className="font-sans font-bold text-[#1C1917]">
                        {formatPrice(completedOrder.total_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Sanity BlueDart Dispatch Simulator Button for testing */}
                  <div className="p-4 rounded-xl bg-white border border-[#E9E3DB] text-left mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">
                          Admin Test: Simulate Sanity BlueDart Dispatch
                        </p>
                        <p className="text-[11px] text-[#78716C]">
                          Fires <code className="text-[#C5A059]">/api/webhooks/sanity-dispatch</code> with BlueDart AWB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateSanityDispatch}
                        disabled={dispatchLoading}
                        className="px-4 py-2 rounded-full bg-[#F3EFEA] hover:bg-[#E8D7D0] border border-[#E9E3DB] text-xs font-semibold text-[#1C1917] transition-all min-h-[40px] flex items-center gap-1.5 cursor-pointer"
                      >
                        <PackageCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>{dispatchLoading ? "Triggering..." : "Simulate Dispatch"}</span>
                      </button>
                    </div>
                    {dispatchStatus && (
                      <p className="text-xs text-[#2D4F3E] font-medium mt-2">
                        ✓ {dispatchStatus}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A059] transition-colors shadow-md min-h-[44px] cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                /* CHECKOUT FORM VIEW */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Guest & Address Form */}
                  <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] mb-1">
                      CONTACT & ADDRESS DETAILS
                    </h4>

                    {/* Error Notice */}
                    {errorMessage && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
                        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold text-amber-950">Notice</p>
                          <p className="mt-0.5">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          Email (Invoice & Tracking) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="yourname@gmail.com"
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center">
                        <span className="px-3.5 py-2.5 bg-[#F3EFEA] border border-r-0 border-[#E9E3DB] rounded-l-xl text-xs font-semibold text-[#78716C] min-h-[44px] flex items-center">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="10-digit mobile number"
                          className="w-full bg-white border border-[#E9E3DB] rounded-r-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-1">
                        Delivery Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) =>
                          setFormData({ ...formData, street: e.target.value })
                        }
                        placeholder="House / flat number, street name, area"
                        className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          placeholder="City"
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                          }
                          placeholder="State"
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postalCode: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="PIN Code"
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                    </div>

                    {/* Razorpay Standard Payment Action */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading || items.length === 0}
                        className="w-full py-4 px-6 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 text-[#C5A059] animate-spin" />
                            <span>{paymentStatusText || "Processing Payment..."}</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 text-[#C5A059]" />
                            <span>Pay {formatPrice(finalTotal)} via Razorpay</span>
                          </>
                        )}
                      </button>

                      {loading && paymentStatusText && (
                        <p className="text-[11px] text-[#78716C] text-center mt-2 animate-pulse">
                          {paymentStatusText}
                        </p>
                      )}
                    </div>
                  </form>

                  {/* Right: Order Line Items Summary */}
                  <div className="lg:col-span-5 bg-[#F3EFEA] rounded-2xl p-5 border border-[#E9E3DB] flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-4">
                        Order Summary ({items.length} items)
                      </h4>

                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {items.map(({ product, quantity }) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#E9E3DB]"
                          >
                            <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#F3EFEA]">
                              <Image
                                src={product.images[0] || "/products/necklace/necklace-01.jpg"}
                                alt={product.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-xs">
                              <h5 className="font-serif font-semibold text-[#1C1917] truncate">
                                {product.title}
                              </h5>
                              <p className="text-[#78716C]">
                                Qty: {quantity} × {formatPrice(product.sale_price ?? product.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-[#E9E3DB] mt-4 pt-4 space-y-2 text-xs text-[#78716C]">
                        <div className="flex justify-between">
                          <span>Items Subtotal</span>
                          <span className="font-sans font-semibold text-[#1C1917] tracking-tight">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span className="text-[#2D4F3E] font-semibold">
                            {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-base pt-2 border-t border-[#E9E3DB]">
                          <span className="font-serif font-semibold text-[#1C1917]">Grand Total</span>
                          <span className="font-sans font-bold text-lg text-[#1C1917] tracking-tight">{formatPrice(finalTotal)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E9E3DB] flex items-center justify-center gap-2 text-[11px] text-[#78716C]">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                      <span>Razorpay 256-Bit SSL Standard Gateway</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

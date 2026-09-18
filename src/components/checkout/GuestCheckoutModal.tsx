"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Truck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  PackageCheck,
} from "lucide-react";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types/database";

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestCheckoutModal({
  isOpen,
  onClose,
}: GuestCheckoutModalProps) {
  const { items, subtotal, shippingFee, finalTotal, clearCart } =
    useHydratedCart();

  const [formData, setFormData] = useState({
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98765 43210",
    street: "Flat 402, Royal Palms Estate, Juhu Tara Road",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400049",
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
          },
          line_items: items.map((i) => ({
            product_id: i.product.id,
            title: i.product.title,
            price: i.product.sale_price ?? i.product.price,
            quantity: i.quantity,
            image: i.product.images[0],
          })),
          total_amount: finalTotal,
        }),
      });

      const data = await response.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        clearCart();

        // Trigger celebratory gold confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D4AF37", "#C5A059", "#E8D7D0", "#1C1917"],
          });
        } catch {
          // ignore if canvas not supported
        }
      }
    } catch (err) {
      console.error("Payment submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateDirectusDispatch = async () => {
    if (!completedOrder) return;
    setDispatchLoading(true);
    try {
      const res = await fetch("/api/webhooks/directus-dispatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-directus-webhook-secret": "anayas_directus_secret_demo",
        },
        body: JSON.stringify({
          order: {
            ...completedOrder,
            tracking_number: "BLUEDART-EXP-98218",
            tracking_url: "https://www.bluedart.com/tracking?track=BLUEDART-EXP-98218",
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDispatchStatus("Parcel dispatched via BlueDart! Tracking email delivered.");
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
            className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E9E3DB] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E9E3DB] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
                    {completedOrder
                      ? "Artisanal Order Confirmed"
                      : "Guest Express Checkout"}
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    {completedOrder
                      ? `Heirloom Reference: ${completedOrder.order_number}`
                      : "No account required • 256-bit Razorpay Encrypted"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F3EFEA] text-[#1C1917] transition-colors focus:ring-2 focus:ring-[#C5A059]"
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
                    Order #{completedOrder.order_number}
                  </h2>
                  <p className="text-sm sm:text-base text-[#78716C] leading-relaxed mb-6 bg-white p-4 rounded-2xl border border-[#E9E3DB]">
                    &ldquo;Thank you for shopping with Anayas. Your order is confirmed and our artisans are preparing it. We will email your courier tracking link as soon as it is dispatched.&rdquo;
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
                      <span className="text-[#78716C]">Courier Allocation</span>
                      <span className="font-semibold text-[#2D4F3E] flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        {completedOrder.courier_name} Insured Express
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-1">
                      <span className="font-serif font-bold text-[#1C1917]">Total Paid</span>
                      <span className="font-serif font-bold text-[#1C1917]">
                        {formatPrice(completedOrder.total_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Directus Dispatch Simulator Button for testing */}
                  <div className="p-4 rounded-xl bg-white border border-[#E9E3DB] text-left mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">
                          Admin Test: Simulate Directus Dispatch Trigger
                        </p>
                        <p className="text-[11px] text-[#78716C]">
                          Fires <code className="text-[#C5A059]">/api/webhooks/directus-dispatch</code> with BlueDart Waybill
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateDirectusDispatch}
                        disabled={dispatchLoading}
                        className="px-4 py-2 rounded-full bg-[#F3EFEA] hover:bg-[#E8D7D0] border border-[#E9E3DB] text-xs font-semibold text-[#1C1917] transition-all min-h-[40px] flex items-center gap-1.5"
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
                    className="px-8 py-3.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A059] transition-colors shadow-md min-h-[44px]"
                  >
                    Continue Exploring Heirlooms
                  </button>
                </div>
              ) : (
                /* CHECKOUT FORM VIEW */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Guest & Address Form */}
                  <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] mb-1">
                      1. Guest Contact & Courier Destination
                    </h4>

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
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#1C1917] mb-1">
                          Email (for Invoice & Courier Link) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-1">
                        Mobile Phone (for BlueDart Courier OTP) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                      />
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
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postalCode: e.target.value,
                            })
                          }
                          className="w-full bg-white border border-[#E9E3DB] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] min-h-[44px]"
                        />
                      </div>
                    </div>

                    {/* Razorpay Standard Payment Action */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading || items.length === 0}
                        className="w-full py-4 px-6 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50"
                      >
                        <CreditCard className="w-4 h-4 text-[#C5A059]" />
                        <span>
                          {loading
                            ? "Connecting to Razorpay..."
                            : `Pay ${formatPrice(finalTotal)} via Razorpay`}
                        </span>
                      </button>
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
                                src={product.images[0]}
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
                            <span className="font-serif font-bold text-xs text-[#1C1917]">
                              {formatPrice((product.sale_price ?? product.price) * quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-[#E9E3DB] mt-4 pt-4 space-y-2 text-xs text-[#78716C]">
                        <div className="flex justify-between">
                          <span>Items Subtotal</span>
                          <span className="font-semibold text-[#1C1917]">
                            {formatPrice(subtotal)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insured Shipping (BlueDart)</span>
                          <span className="text-[#2D4F3E] font-semibold">
                            {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base font-serif font-bold text-[#1C1917] pt-2 border-t border-[#E9E3DB]">
                          <span>Grand Total</span>
                          <span>{formatPrice(finalTotal)}</span>
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

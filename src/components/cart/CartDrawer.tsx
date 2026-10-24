"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/store/useCartStore";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  onProceedCheckout?: () => void;
}

export default function CartDrawer({ onProceedCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    shippingFee,
    finalTotal,
    isHydrated,
  } = useHydratedCart();

  // Disable body scroll when cart drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-md h-dvh max-h-dvh bg-[#FFF6EA] overflow-hidden shadow-2xl border-l border-[#E6D5C3]/70"
          >
            {/* 1. Header & Shipping Bar (shrink-0) */}
            <div className="p-4 sm:p-5 border-b border-[#E6D5C3]/70 bg-[#FFF6EA] shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif text-2xl tracking-wide font-semibold text-[#1C1917]">
                    Your Jewellery Bag
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F3EFEA] text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              {isHydrated && subtotal > 0 && (
                <div className="mt-3.5 p-3 rounded-lg bg-[#F3EFEA] border border-[#E9E3DB]/80 text-xs">
                  {amountNeededForFreeShipping > 0 ? (
                    <div className="flex items-center gap-2 text-[#78716C] mb-1.5">
                      <Truck className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <span>
                        Add{" "}
                        <strong className="text-[#1C1917]">
                          {formatPrice(amountNeededForFreeShipping)}
                        </strong>{" "}
                        more to unlock complimentary shipping.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#2D4F3E] font-medium mb-1.5">
                      <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <span>You have unlocked complimentary shipping!</span>
                    </div>
                  )}
                  <div className="w-full bg-[#E9E3DB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-500 rounded-full"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Scrollable Product List (flex-1 min-h-0 overflow-y-auto) */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {!isHydrated || items.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center justify-center my-auto">
                  <div className="w-20 h-20 rounded-full bg-[#F3EFEA] flex items-center justify-center mb-4 text-[#C5A059]">
                    <ShoppingBag className="w-9 h-9 stroke-1" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1C1917] font-semibold mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-[#78716C] max-w-xs mb-6">
                    Explore our beautiful collection of jewelleries made for all occasions.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all duration-300 shadow-md min-h-[44px]"
                  >
                    Explore Curated Pieces
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => {
                  const unitPrice = product.sale_price ?? product.price;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={product.id}
                      className="p-3.5 rounded-xl bg-white border border-[#E9E3DB] shadow-sm flex gap-3.5 items-center"
                    >
                      {/* Thumbnail with fallback aspect ratio */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F3EFEA]">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium block truncate">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-base text-[#1C1917] font-medium leading-snug truncate">
                          {product.title}
                        </h4>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-sans text-sm font-semibold text-[#1C1917] tracking-tight">
                            {formatPrice(unitPrice)}
                          </span>
                          {product.sale_price && (
                            <span className="font-sans text-xs line-through text-[#78716C]">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        {/* Stepper & Delete */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#E9E3DB] rounded-lg bg-[#FFF6EA]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#1C1917]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="w-8 h-8 flex items-center justify-center text-[#78716C] hover:text-red-700 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* 3. Bottom-Anchored Checkout Footer (shrink-0 mt-auto) */}
            {isHydrated && items.length > 0 && (
              <div className="shrink-0 mt-auto border-t border-[#E6D5C3]/70 bg-[#F7EFE4] pt-4 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3">
                <div className="space-y-1 text-xs text-[#78716C]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-sans font-semibold text-[#1C1917] tracking-tight">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-[#2D4F3E] font-semibold">
                          FREE
                        </span>
                      ) : (
                        <span className="font-sans">{formatPrice(shippingFee)}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-base pt-2 border-t border-[#E6D5C3]/70">
                    <span className="font-serif font-semibold text-[#1C1917]">Total Amount</span>
                    <span className="font-sans font-bold text-lg text-[#1C1917] tracking-tight">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => {
                    if (onProceedCheckout) {
                      onProceedCheckout();
                    } else {
                      window.location.href = "/checkout";
                    }
                  }}
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#1C1917] text-[#FAF8F5] flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-semibold hover:bg-[#C5A059] transition-all duration-300 shadow-lg group focus:ring-2 focus:ring-[#C5A059] focus:outline-none cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Guarantees */}
                <div className="flex items-center justify-center gap-2.5 sm:gap-4 text-[10.5px] text-[#78716C] pt-0.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    Razorpay Verified
                  </span>
                  <span>•</span>
                  <span>Tamper-proof Box</span>
                  <span>•</span>
                  <span>Transit Insurance</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
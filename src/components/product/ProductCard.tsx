"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, X, Check } from "lucide-react";
import { Product } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import ProductFeatures from "./ProductFeatures";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isOutOfStock = product.in_stock === false;
  const activePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-[#F3EFEA]/40 rounded-2xl overflow-hidden border border-[#E9E3DB] hover:border-[#C5A059]/40 hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual Container */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3EFEA] cursor-pointer"
          onClick={() => setQuickViewOpen(true)}
        >
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />

          {/* Secondary Hover Image (Only loaded when hovered to save 50% bandwidth and avoid mobile lag) */}
          {product.images[1] && isHovered && (
            <Image
              src={product.images[1]}
              alt={`${product.title} alternate angle`}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-all duration-700 ease-out opacity-100 scale-105"
            />
          )}

          {/* Luxury Floating Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5 z-10">
            {isOutOfStock ? (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest bg-stone-800/90 text-white shadow-sm backdrop-blur-xs">
                Out of Stock
              </span>
            ) : (
              <>
                {product.is_bestseller && (
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest bg-[#1C1917] text-[#FAF8F5] shadow-sm">
                    Bestseller
                  </span>
                )}
                {hasDiscount && (
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest bg-[#E8D7D0] text-[#1C1917] shadow-sm">
                    Save {discountPercent}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Quick View Trigger on Image Hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewOpen(true);
            }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-white hover:text-[#C5A059]"
            aria-label="Quick view product specifications"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Product Meta & Typography */}
        <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-white/50">
          <div>
            <div className="text-xs text-[#78716C] mb-1">
              <span className="uppercase tracking-widest text-[9px] sm:text-[10px] font-semibold text-[#C5A059]">
                {product.category}
              </span>
            </div>

            <h3
              onClick={() => setQuickViewOpen(true)}
              className="font-serif text-[13px] sm:text-lg lg:text-xl font-medium text-[#1C1917] leading-snug line-clamp-2 hover:text-[#C5A059] transition-colors cursor-pointer min-h-[2rem] sm:min-h-0"
            >
              {product.title}
            </h3>
          </div>

          <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E9E3DB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-sans font-bold text-sm sm:text-lg lg:text-xl text-[#1C1917] tracking-tight">
                {formatPrice(activePrice)}
              </span>
              {hasDiscount && (
                <span className="font-sans text-[10px] sm:text-xs line-through text-[#78716C]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Animated Add to Bag Button / Out of Stock Button */}
            {isOutOfStock ? (
              <span className="w-full sm:w-auto px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 bg-[#78716C]/15 text-[#78716C] border border-[#78716C]/20 cursor-not-allowed select-none shrink-0">
                Out of Stock
              </span>
            ) : (
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                onClick={handleAddToCart}
                className={`add-to-bag-btn group/btn w-full sm:w-auto px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors duration-300 shadow-sm cursor-pointer select-none shrink-0 ${
                  addedAnimation
                    ? "bg-[#2D4F3E] text-white ring-2 ring-[#2D4F3E]/40"
                    : "bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C5A059]"
                }`}
                aria-label={`Add ${product.title} to bag`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {addedAnimation ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.5, y: 4 }}
                      animate={{ opacity: 1, scale: [0.5, 1.15, 1], y: 0 }}
                      exit={{ opacity: 0, scale: 0.7, y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-center gap-1 text-emerald-200 font-semibold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <ShoppingBag
                        className={`w-3.5 h-3.5 transition-colors duration-200 ${
                          isBtnHovered ? "text-white" : "text-[#C5A059]"
                        }`}
                      />
                      <span>Add to Bag</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setQuickViewOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#FFF6EA] border border-[#E9E3DB] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              <button
                type="button"
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md text-[#1C1917] flex items-center justify-center hover:bg-[#F3EFEA] transition-colors focus:ring-2 focus:ring-[#C5A059]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left: Image Showcase */}
              <div className="md:w-1/2 relative min-h-[320px] md:min-h-[460px] bg-[#F3EFEA]">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Modal Right: Details & Specifications */}
              <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                    {product.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-1 mb-3">
                    {product.title}
                  </h2>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-sans font-bold text-2xl text-[#1C1917] tracking-tight">
                      {formatPrice(activePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="font-sans text-sm line-through text-[#78716C]">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Four Core Features (Skin Safe, Anti-Tarnish, Premium Quality, Water Proof) */}
                  <ProductFeatures />
                </div>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={(e) => {
                    if (isOutOfStock) return;
                    handleAddToCart(e);
                    setQuickViewOpen(false);
                  }}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg min-h-[48px] ${
                    isOutOfStock
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed select-none"
                      : "bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C5A059] transition-colors cursor-pointer"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? "Out of Stock" : "Add to Bag & View Cart"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

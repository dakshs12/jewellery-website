"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, X, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Product } from "@/types/database";
import { getAvailableStock, useCartStore } from "@/store/useCartStore";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<number, number>>({});
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [quickViewAdded, setQuickViewAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { items, isHydrated } = useHydratedCart();

  const hasMultipleImages = Boolean(product.images && product.images.length > 1);

  const openQuickView = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex(0);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setActiveImageIndex(0);
  };

  const availableStock = getAvailableStock(product);
  const currentQtyInCart = isHydrated
    ? items.find((item) => item.product.id === product.id)?.quantity || 0
    : 0;
  const isOutOfStock = availableStock === 0;
  const isMaxInCart =
    !isOutOfStock && availableStock !== null && currentQtyInCart >= availableStock;

  const activePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isMaxInCart) return;
    const res = addItem(product, 1);
    if (res.added) {
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleQuickViewAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isMaxInCart) return;
    const res = addItem(product, 1);
    if (res.added) {
      setQuickViewAdded(true);
      setTimeout(() => setQuickViewAdded(false), 1500);
    }
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
          onClick={openQuickView}
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
            onClick={openQuickView}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-white hover:text-[#C5A059] cursor-pointer"
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
              onClick={openQuickView}
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

            {/* Animated Add to Bag Button / Max in Bag / Out of Stock Button */}
            {isOutOfStock ? (
              <span className="w-full sm:w-auto px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 bg-[#78716C]/15 text-[#78716C] border border-[#78716C]/20 cursor-not-allowed select-none shrink-0">
                Out of Stock
              </span>
            ) : isMaxInCart && !addedAnimation ? (
              <span
                title={`Only ${availableStock} piece${availableStock === 1 ? "" : "s"} available — maximum in your bag`}
                className="w-full sm:w-auto px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-medium text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 bg-[#EAD5BE]/60 text-[#57534E] border border-[#D8C2AA] cursor-not-allowed select-none shrink-0"
              >
                <Check className="w-3 h-3 text-[#8C6D2B]" />
                <span>In Bag (Max)</span>
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
              onClick={closeQuickView}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#FFF6EA] border border-[#E9E3DB] rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row"
            >
              <button
                type="button"
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md text-[#1C1917] flex items-center justify-center hover:bg-[#F3EFEA] transition-colors focus:ring-2 focus:ring-[#C5A059] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left: Image Showcase */}
              <div
                className="modal-mobile-image-frame w-full shrink-0 md:shrink md:w-1/2 relative max-h-[56vh] md:max-h-none md:min-h-[460px] bg-[#F3EFEA] overflow-hidden group/modalImg"
                style={
                  {
                    "--mobile-img-aspect": String(
                      imageRatios[activeImageIndex]
                        ? Math.min(1.5, Math.max(0.67, imageRatios[activeImageIndex]))
                        : 0.75
                    ),
                  } as React.CSSProperties
                }
              >
                {product.images.map((img, idx) => (
                  <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      activeImageIndex === idx ? "opacity-100 z-1" : "opacity-0 pointer-events-none z-0"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - Photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-center md:object-cover"
                      priority={idx === 0}
                      onLoad={(e) => {
                        const imgEl = e.currentTarget;
                        if (imgEl.naturalWidth && imgEl.naturalHeight) {
                          const ratio = imgEl.naturalWidth / imgEl.naturalHeight;
                          setImageRatios((prev) =>
                            prev[idx] === ratio ? prev : { ...prev, [idx]: ratio }
                          );
                        }
                      }}
                    />
                  </div>
                ))}

                {/* Multiple Images Navigation Controls */}
                {hasMultipleImages && (
                  <>
                    {/* Left Arrow Button (Subtle & Petite) */}
                    {activeImageIndex > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                        }}
                        className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/75 hover:bg-white text-[#1C1917] hover:text-[#C5A059] border border-white/60 shadow-xs hover:shadow-sm backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                      </button>
                    )}

                    {/* Right Arrow Button (Subtle & Petite) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
                      }}
                      className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/75 hover:bg-white text-[#1C1917] hover:text-[#C5A059] border border-white/60 shadow-xs hover:shadow-sm backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                    </button>

                    {/* Subtle Dots Indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-xs">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            activeImageIndex === idx ? "bg-white w-3.5" : "bg-white/40 w-1.5 hover:bg-white/70"
                          }`}
                          aria-label={`View photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Right: Details & Action */}
              <div className="shrink-0 md:shrink md:w-1/2 p-5 sm:p-8 md:p-10 pt-5 sm:pt-10 md:pt-14 pb-5 sm:pb-8 md:overflow-y-auto flex flex-col justify-between">
                <div className="md:pt-2">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
                    {product.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-1 mb-3 leading-snug">
                    {product.title}
                  </h2>

                  <div className="flex items-baseline gap-3">
                    <span className="font-sans font-bold text-2xl sm:text-3xl text-[#1C1917] tracking-tight">
                      {formatPrice(activePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="font-sans text-sm sm:text-base line-through text-[#78716C]">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {isOutOfStock ? (
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Currently Out of Stock
                    </p>
                  ) : availableStock !== null && availableStock <= 5 ? (
                    <p className="mt-2.5 text-xs font-medium text-[#8C6D2B]">
                      {availableStock === 1
                        ? "Limited piece — only 1 available in stock"
                        : `Limited stock — only ${availableStock} left`}
                    </p>
                  ) : null}
                </div>

                {/* Separate Buttons: ADD TO BAG and VIEW CART (Stacked) */}
                <div className="space-y-3 pt-6 mt-auto">
                  {/* Button 1: ADD TO BAG */}
                  <button
                    type="button"
                    disabled={isOutOfStock || (isMaxInCart && !quickViewAdded)}
                    onClick={handleQuickViewAddToCart}
                    className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all duration-200 min-h-[48px] ${
                      isOutOfStock
                        ? "bg-stone-300 text-stone-500 cursor-not-allowed select-none"
                        : isMaxInCart && !quickViewAdded
                          ? "bg-[#EAD5BE]/70 text-[#57534E] border border-[#D8C2AA] cursor-not-allowed select-none"
                          : "bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C5A059] cursor-pointer active:scale-[0.99]"
                    }`}
                  >
                    {quickViewAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#C5A059]" />
                        <span>Added to Bag</span>
                      </>
                    ) : isOutOfStock ? (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Out of Stock</span>
                      </>
                    ) : isMaxInCart ? (
                      <>
                        <Check className="w-4 h-4 text-[#8C6D2B]" />
                        <span>Max in Bag ({currentQtyInCart}/{availableStock})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: VIEW CART */}
                  <button
                    type="button"
                    onClick={() => {
                      closeQuickView();
                      openCart();
                    }}
                    className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 border border-[#1C1917] text-[#1C1917] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#FAF8F5] transition-all duration-200 cursor-pointer min-h-[48px] active:scale-[0.99]"
                  >
                    <span>View Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

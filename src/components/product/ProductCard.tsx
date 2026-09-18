"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, X, Check, Shield, Award, Sparkles } from "lucide-react";
import { Product } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const activePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />

          {/* Secondary Hover Image */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.title} alternate angle`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Luxury Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_bestseller && (
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-widest bg-[#1C1917] text-[#FAF8F5] shadow-sm">
                Bestseller
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-widest bg-[#E8D7D0] text-[#1C1917] shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Quick View Trigger on Image Hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewOpen(true);
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-white hover:text-[#C5A059]"
            aria-label="Quick view product specifications"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Add to Bag Floating Action (Desktop Hover & Mobile Always Ready) */}
          <div className="absolute bottom-3 inset-x-3 z-10">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all duration-300 min-h-[44px] ${
                addedAnimation
                  ? "bg-[#2D4F3E] text-white"
                  : "bg-white/95 backdrop-blur-md text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5]"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Meta & Typography */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white/50">
          <div>
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
              <span className="uppercase tracking-widest text-[10px] font-semibold text-[#C5A059]">
                {product.category}
              </span>
              <span className="text-[11px] font-sans">Handcrafted</span>
            </div>

            <h3
              onClick={() => setQuickViewOpen(true)}
              className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] leading-snug line-clamp-2 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              {product.title}
            </h3>

            <p className="mt-1 text-xs text-[#78716C] line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E9E3DB] flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                {formatPrice(activePrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs line-through text-[#78716C]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#2D4F3E] font-medium bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E9E3DB]">
              {product.specifications.plating.includes("24K")
                ? "24K Gold"
                : product.specifications.plating.includes("22K")
                ? "22K Gold"
                : "18K Gold"}
            </span>
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
              className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E9E3DB] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
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
                    <span className="font-serif text-2xl font-bold text-[#1C1917]">
                      {formatPrice(activePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm line-through text-[#78716C]">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#78716C] leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Curated Specifications Table */}
                  <div className="border-t border-[#E9E3DB] pt-4 mb-6 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Base Material:</span>
                      <span className="font-medium text-[#1C1917]">
                        {product.specifications.material}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Plating:</span>
                      <span className="font-medium text-[#1C1917]">
                        {product.specifications.plating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Stones & Pearls:</span>
                      <span className="font-medium text-[#1C1917]">
                        {product.specifications.stones}
                      </span>
                    </div>
                    {product.specifications.weight && (
                      <div className="flex justify-between">
                        <span className="text-[#78716C]">Weight:</span>
                        <span className="font-medium text-[#1C1917]">
                          {product.specifications.weight}
                        </span>
                      </div>
                    )}
                    {product.specifications.closure && (
                      <div className="flex justify-between">
                        <span className="text-[#78716C]">Fastening:</span>
                        <span className="font-medium text-[#1C1917]">
                          {product.specifications.closure}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Trust markers */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#78716C] bg-[#F3EFEA] p-3 rounded-xl mb-6">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Artisanal Finish</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Skin-Safe & Nickel-Free</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    handleAddToCart(e);
                    setQuickViewOpen(false);
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag & View Cart</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

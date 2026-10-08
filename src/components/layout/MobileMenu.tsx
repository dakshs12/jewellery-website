"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";

import { COLLECTIONS } from "@/data/collections";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#FAF8F5] border-r border-[#E9E3DB] shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-[#E9E3DB]">
                <div>
                  <Image
                    src="/2.svg"
                    alt="Anayas"
                    width={180}
                    height={91}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#F3EFEA] text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-5 space-y-1">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[#F3EFEA] text-[#1C1917] transition-colors group min-h-[44px]"
                >
                  <span className="font-serif text-lg tracking-wide group-hover:text-[#C5A059] transition-colors font-medium">
                    HOME
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>

                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#78716C] px-3 pt-3 pb-1">
                  Shop by Collection
                </p>
                {COLLECTIONS.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[#F3EFEA] text-[#1C1917] transition-colors group min-h-[44px]"
                  >
                    <div>
                      <span className="font-serif text-base tracking-wide group-hover:text-[#C5A059] transition-colors">
                        {cat.name}
                      </span>
                      <p className="text-[11px] text-[#78716C]">
                        {cat.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C5A059] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}

                <Link
                  href="/products"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[#C5A059] font-medium text-xs tracking-wider uppercase hover:bg-[#F3EFEA] transition-colors"
                >
                  <span>View All Heirlooms</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </Link>
              </div>
            </div>

            {/* Bottom Concierge & Guarantees */}
            <div className="p-5 border-t border-[#E9E3DB] bg-[#F3EFEA]/60 space-y-4">
              <div className="p-3.5 rounded-xl bg-white/80 border border-[#E9E3DB] shadow-sm">
                <div className="flex items-center gap-2.5 text-[#1C1917]">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-serif text-sm font-semibold">
                    The Anayas Heritage Promise
                  </span>
                </div>
                <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                  22K antique gold micron plating, skin-safe hypoallergenic brass alloys, and anti-tarnish protective lacquer.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#78716C] pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Insured Pan-India Courier</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#1C1917] font-medium">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Bridal Concierge</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

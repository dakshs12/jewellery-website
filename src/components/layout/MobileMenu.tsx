"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, PhoneCall, ShieldCheck, ArrowRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { name: "All Heirlooms", href: "/#products", badge: "New" },
  { name: "Necklaces & Chokers", href: "/#necklaces", subtitle: "Polki, Kundan & Temple Malas" },
  { name: "Statement Earrings", href: "/#earrings", subtitle: "Chandbalis & Jhumkas" },
  { name: "Artisan Bangles & Kadas", href: "/#bangles", subtitle: "18K Plated & Meenakari" },
  { name: "Imperial Bridal Sets", href: "/#bridal-sets", subtitle: "Ensembles for the Modern Bride" },
  { name: "Bestseller Gallery", href: "/#bestsellers", badge: "Trending" },
];

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
                  <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-[#1C1917]">
                    ANAYAS
                  </span>
                  <p className="text-[10px] tracking-widest text-[#78716C] uppercase mt-0.5">
                    Haute Imitation Jewellery
                  </p>
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
                <p className="text-[11px] font-semibold tracking-widest uppercase text-[#78716C] px-3 pb-2">
                  Artisanal Collections
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3.5 rounded-lg hover:bg-[#F3EFEA] text-[#1C1917] transition-colors group min-h-[48px]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg tracking-wide group-hover:text-[#C5A059] transition-colors">
                          {cat.name}
                        </span>
                        {cat.badge && (
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#E8D7D0] text-[#1C1917]">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      {cat.subtitle && (
                        <p className="text-xs text-[#78716C] mt-0.5">
                          {cat.subtitle}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C5A059] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
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

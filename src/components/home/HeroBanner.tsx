"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Gem } from "lucide-react";

export default function HeroBanner() {
  const scrollToCatalog = () => {
    const el = document.getElementById("products");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E9E3DB]">
      {/* Subtle gold decorative gradient orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#E8D7D0]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Editorial Kicker */}
            <div className="mb-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#78716C] block">
                Artisanal Festive & Bridal Collection 2026
              </span>
            </div>

            {/* Fluid Luxury Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium text-[#1C1917] tracking-tight leading-[1.08] mb-6">
              Heirlooms of <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C5A059]">
                Timeless Splendor,
              </span>{" "}
              Crafted with Soul.
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg text-[#78716C] max-w-xl leading-relaxed mb-8">
              Immerse yourself in regal Jadau, uncut Polki, and 22K antique micron gold-plated imitation jewellery. Indistinguishable from ancestral heirlooms, handcrafted for life&apos;s most cherished celebrations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group min-h-[48px]"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("bridal-sets");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-full bg-[#F3EFEA] border border-[#E9E3DB] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#E8D7D0] transition-all duration-300 flex items-center justify-center min-h-[48px]"
              >
                Bridal Trousseau
              </button>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E9E3DB] max-w-lg">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] block">
                  24K
                </span>
                <span className="text-[11px] text-[#78716C] leading-tight block mt-0.5">
                  Micron Gold Layering
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] block">
                  100%
                </span>
                <span className="text-[11px] text-[#78716C] leading-tight block mt-0.5">
                  Anti-Tarnish Sealed
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] block">
                  5,000+
                </span>
                <span className="text-[11px] text-[#78716C] leading-tight block mt-0.5">
                  Royal Brides Adorned
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Showcase Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Hero Portrait */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] bg-[#F3EFEA]">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop"
                alt="Royal Anayas Artisanal Bridal Collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8D7D0] font-semibold block">
                  Imperial Edition
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-light tracking-wide mt-1">
                  The Mumtaz Rajputana Ensemble
                </h2>
              </div>
            </div>

            {/* Overlapping Floating Detail Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 bg-white/95 backdrop-blur-md border border-[#E9E3DB] p-4 rounded-2xl shadow-xl items-center gap-3.5 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#F3EFEA] flex items-center justify-center text-[#C5A059] flex-shrink-0">
                <Gem className="w-6 h-6 stroke-1" />
              </div>
              <div>
                <p className="text-xs font-serif font-semibold text-[#1C1917]">
                  Jadau Polki Artistry
                </p>
                <p className="text-[11px] text-[#78716C]">
                  Reverse Meenakari enameling on each heirloom piece.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

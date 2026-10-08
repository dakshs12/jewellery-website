"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";

// The 7 Disciplines partitioned into an Asymmetric 2-Tier Composition:
// Tier 1: Necklace, Earrings, Rings (Major Bridal & Festive Pillars)
// Tier 2: Pendant Sets, Everyday Wear, Bracelets, Mangalsutra
const TIER_ONE_KEYS = ["necklace", "earrings", "rings"];

export default function CollectionSection() {
  const tierOneCollections = COLLECTIONS.filter((c) =>
    TIER_ONE_KEYS.includes(c.id)
  );
  const tierTwoCollections = COLLECTIONS.filter(
    (c) => !TIER_ONE_KEYS.includes(c.id)
  );

  return (
    <section
      id="collections"
      className="py-20 sm:py-28 bg-[#FAF8F5] relative border-b border-[#E9E3DB]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-tight">
            Our Collection
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#78716C] mt-3 leading-relaxed">
            Explore the signature categories of our collection.
          </p>
        </div>

        {/* ========================================================
            TIER 1: Primary Signature Pillars (Necklace, Earrings, Rings)
           ======================================================== */}
        <div className="mb-6 sm:gap-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {tierOneCollections.map((col) => (
              <Link
                key={col.id}
                href={`/products?category=${encodeURIComponent(col.name)}`}
                className="group relative h-[460px] sm:h-[500px] rounded-2xl overflow-hidden bg-[#24201D] border border-[#E5DDD2] hover:border-[#C5A059] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 block"
              >
                {/* Background Heirloom Image with Smooth Hover Zoom */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Atmospheric Gradient for Rich Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-500" />

                {/* Bottom Editorial Content */}
                <div className="relative z-10 text-white">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#F3E5D0] transition-colors duration-300">
                    {col.name}
                  </h3>

                  {/* Animated Gold Divider */}
                  <div className="my-3.5 h-[1.5px] w-10 bg-[#C5A059]/70 transition-all duration-300 group-hover:w-20 group-hover:bg-[#C5A059]" />

                  {/* CTA link */}
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            TIER 2: Refined Edits (Pendant Sets, Everyday Wear, Bracelets, Mangalsutra)
           ======================================================== */}
        <div className="mt-6 sm:mt-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {tierTwoCollections.map((col) => (
              <Link
                key={col.id}
                href={`/products?category=${encodeURIComponent(col.name)}`}
                className="group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#24201D] border border-[#E5DDD2] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-5 sm:p-6 block"
              >
                {/* Background Heirloom Image */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-500" />

                {/* Bottom Editorial Content */}
                <div className="relative z-10 text-white">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#F3E5D0] transition-colors duration-300">
                    {col.name}
                  </h3>

                  {/* Subtle Gold Line */}
                  <div className="my-3 h-[1px] w-8 bg-[#C5A059]/60 transition-all duration-300 group-hover:w-14 group-hover:bg-[#C5A059]" />

                  {/* CTA link */}
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Heirlooms Button */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

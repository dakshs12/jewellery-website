import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";

// The 7 Disciplines partitioned into an Asymmetric 2-Tier Composition for Desktop:
// Tier 1: Necklace, Earrings, Rings (Major Bridal & Festive Pillars)
// Tier 2: Pendant Sets, Everyday Wear, Bracelets, Mangalsutra
const TIER_ONE_KEYS = ["necklace", "earrings", "rings"];

interface CollectionSectionProps {
  categoryImages?: Record<string, string | undefined>;
}

export default function CollectionSection({
  categoryImages,
}: CollectionSectionProps = {}) {
  const collections = useMemo(() => {
    if (!categoryImages) return COLLECTIONS;
    return COLLECTIONS.map((c) => {
      const override =
        categoryImages[c.id] ||
        categoryImages[c.slug] ||
        categoryImages[c.name.toLowerCase()];
      return override ? { ...c, image: override } : c;
    });
  }, [categoryImages]);

  // Desktop partitioning (unchanged)
  const tierOneCollections = collections.filter((c) =>
    TIER_ONE_KEYS.includes(c.id)
  );
  const tierTwoCollections = collections.filter(
    (c) => !TIER_ONE_KEYS.includes(c.id)
  );

  // Mobile partitioning:
  // 2x2 Grid (4 items): Necklace, Earrings / Rings, Pendant Sets
  const mobileTopFour = useMemo(() => {
    const keys = ["necklace", "earrings", "rings", "pendant-sets"];
    return keys
      .map((k) => collections.find((c) => c.id === k))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [collections]);

  // 3x1 Grid (3 items): Everyday Wear, Bracelets, Mangalsutra
  const mobileBottomThree = useMemo(() => {
    const keys = ["everyday-wear", "bracelets", "mangalsutra"];
    return keys
      .map((k) => collections.find((c) => c.id === k))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [collections]);

  return (
    <section
      id="collections"
      className="py-14 sm:py-20 md:py-28 bg-[#FFF6EA] relative border-b border-[#E9E3DB]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-tight">
            Our Collection
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#78716C] mt-2 sm:mt-3 leading-relaxed">
            Explore the signature categories of our collection.
          </p>
        </div>

        {/* ========================================================
            MOBILE VIEW (< md): 2x2 (Top 4) + 3x1 (Bottom 3)
           ======================================================== */}
        <div className="md:hidden">
          {/* 2x2 Grid: Necklace, Earrings / Rings, Pendant Sets */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {mobileTopFour.map((col) => (
              <Link
                key={col.id}
                href={`/products?category=${encodeURIComponent(col.name)}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F3EFEA] border border-[#E5DDD2] active:scale-[0.98] transition-all flex flex-col justify-end p-3.5 block shadow-sm"
              >
                {/* Background Heirloom Image */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Bottom Editorial Content */}
                <div className="relative z-10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  <h3 className="font-serif text-base sm:text-lg font-medium tracking-tight text-white leading-snug">
                    {col.name}
                  </h3>
                  <div className="my-1.5 h-[1px] w-6 bg-[#C5A059]" />
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5]">
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 3x1 Grid: Everyday Wear, Bracelets, Mangalsutra */}
          <div className="grid grid-cols-3 gap-2">
            {mobileBottomThree.map((col) => (
              <Link
                key={col.id}
                href={`/products?category=${encodeURIComponent(col.name)}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F3EFEA] border border-[#E5DDD2] active:scale-[0.98] transition-all flex flex-col justify-end p-2.5 block shadow-sm"
              >
                {/* Background Heirloom Image */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom Editorial Content */}
                <div className="relative z-10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  <h3 className="font-serif text-sm sm:text-base font-medium tracking-tight text-white leading-tight break-words">
                    {col.name}
                  </h3>
                  <div className="my-1 h-[1px] w-4 bg-[#C5A059]" />
                  <div className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#FAF8F5]">
                    <span>VIEW</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C5A059]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================
            DESKTOP VIEW (md and up): Tier 1 (3 cols) + Tier 2 (4 cols)
            KEPT 100% UNCHANGED AS REQUESTED
           ======================================================== */}
        <div className="hidden md:block">
          {/* TIER 1: Primary Signature Pillars (Necklace, Earrings, Rings) */}
          <div className="mb-6 sm:gap-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {tierOneCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/products?category=${encodeURIComponent(col.name)}`}
                  className="group relative h-[460px] sm:h-[500px] rounded-2xl overflow-hidden bg-[#F3EFEA] border border-[#E5DDD2] hover:border-[#C5A059] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 block"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="relative z-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#F3E5D0] transition-colors duration-300">
                      {col.name}
                    </h3>
                    <div className="my-3.5 h-[1.5px] w-10 bg-[#C5A059] transition-all duration-300 group-hover:w-20 shadow-sm" />
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* TIER 2: Refined Edits (Pendant Sets, Everyday Wear, Bracelets, Mangalsutra) */}
          <div className="mt-6 sm:mt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {tierTwoCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/products?category=${encodeURIComponent(col.name)}`}
                  className="group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#F3EFEA] border border-[#E5DDD2] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-5 sm:p-6 block"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="relative z-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#F3E5D0] transition-colors duration-300">
                      {col.name}
                    </h3>
                    <div className="my-3 h-[1px] w-8 bg-[#C5A059] transition-all duration-300 group-hover:w-14 shadow-sm" />
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Heirlooms Button */}
        <div className="mt-10 sm:mt-14 md:mt-16 text-center">
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

"use client";

import Image from "next/image";
import { Sparkles, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export default function ArtisanStory() {
  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#E9E3DB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Dual Editorial Imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white/60">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
                alt="Intricate Kundan Stone Setting"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop"
                alt="Handcrafted Gold Micron Finishing"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-2xl border border-[#E9E3DB] shadow-xl text-center">
              <span className="font-serif text-2xl font-bold text-[#1C1917] block">
                70+ Hours
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#78716C]">
                Hand-setting Per Set
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#78716C]">
                The Anayas Heritage
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] tracking-tight leading-tight mb-6">
              Ancestral Jadau Mastery, <br />
              <span className="italic font-normal text-[#C5A059]">
                Reimagined for the Modern Queen.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed mb-8">
              Founded on the belief that fine jewellery should be worn, lived in, and celebrated without restraint. Anayas partners with multi-generational karigars across Jaipur and Hyderabad to fashion imitation heirlooms that capture the weight, brilliance, and nuance of royal museum treasures.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[#E9E3DB]">
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] flex-shrink-0">
                  <Award className="w-5 h-5 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                    Double-Tier Micron Plating
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">
                    Our proprietary 22K and 24K gold immersion layers are treated with high-grade anti-tarnish glaze, retaining their warm luster for years.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[#E9E3DB]">
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                    Hypoallergenic & Lead/Nickel Free
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">
                    Formulated exclusively on brass alloys rigorously tested for zero skin irritation, ensuring day-long bridal comfort.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[#E9E3DB]">
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#C5A059] flex-shrink-0">
                  <HeartHandshake className="w-5 h-5 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                    Artisan Fair-Trade Guild
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">
                    Directly funding master stone-cutters and enlisting women artisans in delicate pearl piroi stringing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

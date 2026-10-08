"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function InstagramIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const INSTAGRAM_CARDS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    alt: "Couple with wedding rings and bridal flower bouquet",
    tag: "Royal Wedding Trousseau",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1481980235850-66e47651e431?q=80&w=800&auto=format&fit=crop",
    alt: "Bride hands adorned with stacking heirloom rings on white silk gown",
    tag: "Artisanal Rings & Bands",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1634149136549-47350a401065?q=80&w=800&auto=format&fit=crop",
    alt: "Model adorned with statement gold earrings",
    tag: "Festive Chandbalis",
  },
];

export default function InstagramSection() {
  const instagramUrl = "https://www.instagram.com/_anayasjewels/";
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      gsap.from(cards, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FAF8F5]">
      {/* 1. Header Text in the warm cream upper section */}
      <div className="pt-16 sm:pt-24 pb-10 sm:pb-14 text-center max-w-xl mx-auto px-4">
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#78716C] block mb-2">
          Adorned By You
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#1C1917] tracking-tight">
          Follow Our Heirloom Journey
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#78716C] mt-2">
          Tag <span className="font-medium text-[#C5A059]">@_anayasjewels</span> to be featured in our royal gallery
        </p>
      </div>

      {/* 2. Horizon Split Row: The cards row itself is bisected exactly 50/50 by the horizon */}
      <div className="relative w-full">
        {/* Background split: Top 50% cream (#FAF8F5), Bottom 50% dark (#1C1917) */}
        <div className="absolute inset-0 flex flex-col pointer-events-none" aria-hidden="true">
          <div className="h-1/2 w-full bg-[#FAF8F5]" />
          <div className="h-1/2 w-full bg-[#1C1917]" />
        </div>

        {/* 4 Square Cards sitting symmetrically across the horizon */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={cardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 items-stretch"
          >
            {/* Photography Cards 1, 2, 3 */}
            {INSTAGRAM_CARDS.map((card) => (
              <a
                key={card.id}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden shadow-xl bg-[#EAE5DF] block rounded-sm cursor-pointer"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle luxury hover overlay with Instagram handle */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                  <InstagramIcon className="w-6 h-6 stroke-[1.6] mb-2 text-white" />
                  <span className="text-xs font-medium tracking-wide">
                    @_anayasjewels
                  </span>
                  <span className="text-[10px] text-white/80 mt-1 uppercase tracking-wider">
                    {card.tag}
                  </span>
                </div>
              </a>
            ))}

            {/* 4th Card: Terracotta "Join our Instagram" Card */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden shadow-xl bg-[#A86E3C] hover:bg-[#976033] transition-colors duration-300 flex flex-col items-center justify-center p-6 text-center text-white rounded-sm cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center space-y-3.5 sm:space-y-4">
                {/* Outline Instagram Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <InstagramIcon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8] text-white" />
                </div>

                {/* Headline matching reference */}
                <span className="font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-snug">
                  Join our <br />
                  Instagram
                </span>

                {/* Horizontal Arrow */}
                <div className="pt-1">
                  <ArrowRight className="w-6 h-6 text-white stroke-[2] transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>

              {/* Discreet handle tag at bottom */}
              <span className="absolute bottom-3 text-[10px] uppercase tracking-widest text-white/70">
                @_anayasjewels
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Dark lower margin that smoothly meets the dark Footer */}
      <div className="h-12 sm:h-16 bg-[#1C1917] w-full" />
    </section>
  );
}

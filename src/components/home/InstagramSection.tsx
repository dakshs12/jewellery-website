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
    image: "/products/necklace/necklace-08.jpg",
    alt: "Imperial Heritage Jadau Choker Necklace",
    tag: "Royal Heritage Chokers",
  },
  {
    id: 2,
    image: "/products/bracelets/bracelets-03.jpg",
    alt: "Handcrafted 22K Gold Plated Kadas",
    tag: "Artisanal Kadas & Bangles",
  },
  {
    id: 3,
    image: "/products/earrings/earrings-01.jpg",
    alt: "Kundan & Pearl Statement Chandbalis",
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
    <section ref={sectionRef} className="relative w-full bg-[#FFF6EA]">
      {/* 1. Header Text in the warm cream upper section */}
      <div className="pt-8 sm:pt-12 pb-10 sm:pb-14 text-center max-w-xl mx-auto px-4">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#1C1917] tracking-tight">
          Follow Our Journey
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#78716C] mt-2">
          Tag <span className="font-medium text-[#C5A059]">@_anayasjewels</span> to be featured in our feed
        </p>
      </div>

      {/* 2. Horizon Split Row: The cards row itself is bisected exactly 50/50 by the horizon */}
      <div className="relative w-full">
        {/* Background split: Top 50% cream (#FFF6EA), Bottom 50% dark (#1C1917) */}
        <div className="absolute inset-0 flex flex-col pointer-events-none" aria-hidden="true">
          <div className="h-1/2 w-full bg-[#FFF6EA]" />
          <div className="h-1/2 w-full bg-[#1C1917]" />
        </div>

        {/* 4 Square Cards sitting symmetrically across the horizon */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={cardsRef}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start"
          >
            {/* Photography Cards (4 cards in total: 2x2 grid on mobile, 1x4 on desktop) */}
            {INSTAGRAM_CARDS.map((card) => (
              <a
                key={card.id}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full aspect-square relative overflow-hidden rounded-2xl block shadow-xl bg-[#EAE5DF] cursor-pointer"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle luxury hover overlay with Instagram handle */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 sm:p-4 text-center text-white">
                  <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6] mb-1 sm:mb-2 text-white" />
                  <span className="text-[11px] sm:text-xs font-medium tracking-wide">
                    @_anayasjewels
                  </span>
                  <span className="hidden sm:block text-[10px] text-white/80 mt-1 uppercase tracking-wider">
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
              className="group w-full aspect-square relative overflow-hidden rounded-2xl block shadow-xl bg-[#A86E3C] hover:bg-[#976033] transition-colors duration-300 text-white cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 md:space-y-3.5">
                  {/* Outline Instagram Icon */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 stroke-[1.8] text-white" />
                  </div>

                  {/* Headline matching reference */}
                  <span className="font-serif text-sm sm:text-base md:text-xl lg:text-2xl font-medium tracking-tight leading-tight">
                    Join our <br />
                    Instagram
                  </span>

                  {/* Horizontal Arrow */}
                  <div className="pt-0.5 sm:pt-1">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>

                {/* Discreet handle tag at bottom (desktop/tablet only) */}
                <span className="hidden sm:block absolute bottom-2 sm:bottom-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70">
                  @_anayasjewels
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Dark lower margin that smoothly meets the dark Footer */}
      <div className="h-12 sm:h-16 bg-[#1C1917] w-full" />
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVIEWS = [
  {
    id: 1,
    quote:
      "The packaging was beautiful, and the jewellery was even better. Definitely a lovely experience!",
    author: "Meera Sengupta",
  },
  {
    id: 2,
    quote:
      "I purchased this as a gift, and it was absolutely loved! The presentation was beautiful, and the jewellery looked stunning. Will definitely be shopping again.",
    author: "Ananya Singhal",
  },
  {
    id: 3,
    quote:
      "The quality and detailing are beautiful. The piece looks so much more exquisite in person. I am extremely happy with my purchase!",
    author: "Pooja Radhakrishnan",
  },
  {
    id: 4,
    quote:
      "The jewellery is even more beautiful in person! The detailing is so intricate, and the finishing is absolutely lovely. Truly a beautiful addition to my collection.",
    author: "Dr. Tanvi Mehta",
  },
  {
    id: 5,
    quote:
      "Absolutely loved my Anayas purchase! The jewellery looks so elegant and feels special. It was exactly what I was looking for.",
    author: "Rhea Kapoor",
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicated array for seamless continuous loop
  const loopReviews = [...REVIEWS, ...REVIEWS];

  useGSAP(
    () => {
      if (!trackRef.current) return;

      // Continuous horizontal moving carousel
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 38,
        repeat: -1,
      });

      tweenRef.current = tween;

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.6, ease: "power1.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power1.out" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFF6EA] pt-20 sm:pt-28 pb-10 sm:pb-14 border-t border-[#E9E3DB] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-tight">
            What Our Customers Say
          </h2>
        </div>
      </div>

      {/* GSAP Continuous Moving Horizontal Carousel */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle Edge Vignettes for seamless fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF6EA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF6EA] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 will-change-transform py-4"
          style={{ width: "fit-content" }}
        >
          {loopReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[330px] sm:w-[400px] flex-shrink-0 p-7 sm:p-8 rounded-2xl bg-[#F4EFEA]/90 border border-[#E5DDD2] shadow-sm hover:shadow-md hover:border-[#D5C9B8] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header inside card: Quote mark only */}
              <div className="mb-5">
                <Quote className="w-7 h-7 text-[#C5A059]/50 stroke-[1.3]" />
              </div>

              {/* Patron Quote */}
              <blockquote className="font-serif text-base sm:text-[17px] text-[#1C1917] leading-relaxed italic mb-6">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Author Name Only */}
              <div className="pt-4 border-t border-[#E5DDD2] text-left">
                <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917]">
                  {review.author}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#F3EFEA] border-b border-[#E9E3DB] text-[#1C1917] px-4 py-2 text-xs md:text-sm font-medium tracking-wider text-center flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 animate-pulse" />
      <span className="truncate">
        Complimentary Insured Express Delivery Across India on Orders Above ₹3,000
      </span>
      <span className="hidden sm:inline text-[#C5A059]">•</span>
      <span className="hidden sm:inline font-serif italic text-[#78716C]">
        Artisanal Jadau & Polki Heirlooms
      </span>
    </div>
  );
}

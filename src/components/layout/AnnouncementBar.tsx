"use client";

import { Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#F3EFEA] border-b border-[#E9E3DB] text-[#1C1917] px-4 py-2 text-xs md:text-sm font-medium tracking-wide text-center flex items-center justify-center gap-2">
      <Truck className="w-4 h-4 text-[#C5A059] flex-shrink-0" strokeWidth={1.8} />
      <span className="truncate">
        Free Express Delivery on all orders above ₹2,000
      </span>
    </div>
  );
}

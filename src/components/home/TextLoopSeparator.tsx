"use client";

const PHRASES = [
  "Style it your way",
  "Luxury within reach",
  "Made to layer",
  "Style it your way",
  "Luxury within reach",
  "Made to layer",
  "Style it your way",
  "Luxury within reach",
  "Made to layer",
];

export default function TextLoopSeparator() {
  return (
    <section
      aria-label="Brand Signature Loop"
      className="relative w-full overflow-hidden bg-[#FAF8F5] border-y border-[#E9E3DB] py-3.5 sm:py-4 md:py-4.5 select-none pointer-events-none"
    >
      <div className="flex animate-marquee items-center whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center">
          {PHRASES.map((phrase, idx) => (
            <span key={`p1-${idx}`} className="inline-flex items-center">
              <span className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1C1917] tracking-wide">
                {phrase}
              </span>
              <span
                className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#C5A059] mx-6 sm:mx-8 md:mx-10 shrink-0"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>

        {/* Track 2 (Clone for seamless infinite loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {PHRASES.map((phrase, idx) => (
            <span key={`p2-${idx}`} className="inline-flex items-center">
              <span className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1C1917] tracking-wide">
                {phrase}
              </span>
              <span
                className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#C5A059] mx-6 sm:mx-8 md:mx-10 shrink-0"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

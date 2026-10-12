"use client";

export function SkinSafeIcon({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft pink feather fill */}
      <path
        d="M26 13C33 11 41 14 46 19C42 22 35 24 28 23C23 22 23 16 26 13Z"
        fill="#FADBD8"
      />
      {/* Feather outline and central shaft */}
      <path
        d="M22 24C27 15 36 12 47 19C41 23 34 24.5 25 24M23 23L45 19M31 17L35 19M37 16L40 19"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cupped Hand */}
      <path
        d="M15 34H23L31 36C35 37 38 37 42 35L49 29.5C50.8 28 52.8 30 51 31.8L43 38C39.5 40.5 35 41.5 31 41.5H23M15 41H23"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 34V41"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M27 35C27 32 30 31 33 32.5L37 34"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AntiTarnishIcon({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Large central 4-point sparkle */}
      <path
        d="M32 14C32 23 23 32 14 32C23 32 32 41 32 50C32 41 41 32 50 32C41 32 32 23 32 14Z"
        fill="#FADBD8"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Top-left small sparkle */}
      <path
        d="M20 16C20 19.5 16.5 23 13 23C16.5 23 20 26.5 20 30C20 26.5 23.5 23 27 23C23.5 23 20 19.5 20 16Z"
        transform="translate(-4, -4) scale(0.7)"
        fill="#FADBD8"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Bottom-right small sparkle */}
      <path
        d="M20 16C20 19.5 16.5 23 13 23C16.5 23 20 26.5 20 30C20 26.5 23.5 23 27 23C23.5 23 20 19.5 20 16Z"
        transform="translate(26, 20) scale(0.75)"
        fill="#FADBD8"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PremiumQualityIcon({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top 3 sparkle shine rays */}
      <path
        d="M32 13V18M23 16L26 20M41 16L38 20"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Diamond Pavilion with soft pink fill */}
      <path
        d="M21 29L32 49L43 29H21Z"
        fill="#FADBD8"
      />
      {/* Diamond Outline & Facets */}
      <path
        d="M21 29L26 23H38L43 29L32 49L21 29Z"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M26 23L32 29L38 23"
        stroke="#1C1917"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 29V49"
        stroke="#1C1917"
        strokeWidth="2.2"
      />
      <path
        d="M21 29H43"
        stroke="#1C1917"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function WaterProofIcon({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Water droplet */}
      <path
        d="M30 14C30 14 18 29 18 37C18 44.5 24 50 31.5 50C33.5 50 35.5 49.5 37 48.5C36.4 47 36 45.3 36 43.5C36 37.7 40.7 33 46.5 33C47 33 47.5 33 48 33.1C48.7 30 47.5 26.5 44 22L30 14Z"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Circular checkmark badge on bottom right */}
      <circle
        cx="44"
        cy="43"
        r="10"
        fill="#FADBD8"
        stroke="#1C1917"
        strokeWidth="2.4"
      />
      {/* Checkmark */}
      <path
        d="M40 43L43 46L49 40"
        stroke="#1C1917"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductFeatures() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 py-5 my-4 border-y border-[#E9E3DB]">
      <div className="flex flex-col items-center text-center">
        <SkinSafeIcon className="w-10 h-10 sm:w-11 sm:h-11 mb-2" />
        <span className="text-xs sm:text-[13px] font-sans font-medium text-[#1C1917] leading-tight">
          Skin Safe
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        <AntiTarnishIcon className="w-10 h-10 sm:w-11 sm:h-11 mb-2" />
        <span className="text-xs sm:text-[13px] font-sans font-medium text-[#1C1917] leading-tight">
          Anti-<br />Tarnish
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        <PremiumQualityIcon className="w-10 h-10 sm:w-11 sm:h-11 mb-2" />
        <span className="text-xs sm:text-[13px] font-sans font-medium text-[#1C1917] leading-tight">
          Premium<br />Quality
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        <WaterProofIcon className="w-10 h-10 sm:w-11 sm:h-11 mb-2" />
        <span className="text-xs sm:text-[13px] font-sans font-medium text-[#1C1917] leading-tight">
          Water<br />Proof
        </span>
      </div>
    </div>
  );
}

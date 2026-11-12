"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon, SOCIAL_LINKS } from "@/components/common/SocialIcons";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Never show inside Sanity Studio
    if (pathname?.startsWith("/studio")) {
      return;
    }

    const checkVisibility = () => {
      const hero = document.getElementById("hero-section");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // Appears once the user has scrolled past the hero section
        setIsVisible(rect.bottom <= 100);
      } else {
        // On pages without a hero section, appear after scrolling down slightly
        setIsVisible(window.scrollY > 200);
      }
    };

    // Check once immediately on route load / mount
    checkVisibility();

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [pathname]);

  // Don't render inside Sanity Studio admin
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.22),0_2px_8px_rgba(37,211,102,0.38)] hover:bg-[#20ba59] hover:shadow-[0_6px_22px_rgba(37,211,102,0.52)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer group"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-xs transition-transform group-hover:scale-105" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}


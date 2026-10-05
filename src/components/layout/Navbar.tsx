"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Search, X, Sparkles } from "lucide-react";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";
import AnnouncementBar from "./AnnouncementBar";

const NAV_LINKS = [
  { name: "Necklaces", href: "/#necklaces" },
  { name: "Earrings", href: "/#earrings" },
  { name: "Bangles & Kadas", href: "/#bangles" },
  { name: "Bridal Sets", href: "/#bridal-sets" },
  { name: "Bestsellers", href: "/#bestsellers", isSpecial: true },
];

interface NavbarProps {
  onProceedCheckout?: () => void;
}

export default function Navbar({ onProceedCheckout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalCount, openCart, isHydrated } = useHydratedCart();

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Main Navbar */}
        <nav className="w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E9E3DB] transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Left Side: Mobile Hamburger OR Desktop Category Links */}
              <div className="flex items-center lg:w-1/3">
                {/* Mobile Menu Trigger (44x44px target) */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#1C1917] hover:bg-[#F3EFEA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-6 h-6 stroke-[1.5]" />
                </button>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-7 text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917]">
                  {NAV_LINKS.slice(0, 3).map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="relative py-2 hover:text-[#C5A059] transition-colors group"
                    >
                      <span>{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Center: Brand Logo */}
              <div className="flex flex-col items-center justify-center text-center">
                <Link
                  href="/"
                  className="group focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded-sm px-2 flex items-center justify-center py-0.5"
                >
                  <Image
                    src="/anayas.png"
                    alt="Anayas"
                    width={280}
                    height={142}
                    priority
                    className="h-14 sm:h-16 md:h-[72px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </Link>
              </div>

              {/* Right Side: Desktop extra links + Action Icons */}
              <div className="flex items-center justify-end gap-3 sm:gap-6 lg:w-1/3">
                <div className="hidden lg:flex items-center gap-7 text-xs tracking-[0.15em] uppercase font-medium text-[#1C1917]">
                  {NAV_LINKS.slice(3).map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="relative py-2 hover:text-[#C5A059] transition-colors group flex items-center gap-1.5"
                    >
                      {link.isSpecial && (
                        <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      )}
                      <span>{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>

                {/* Search Icon Trigger (44x44px target) */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-11 h-11 flex items-center justify-center rounded-full text-[#1C1917] hover:bg-[#F3EFEA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="Search collection"
                >
                  <Search className="w-5 h-5 stroke-[1.5]" />
                </button>

                {/* Cart Bag Trigger with dynamic badge (44x44px target) */}
                <button
                  type="button"
                  onClick={openCart}
                  className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#1C1917] hover:bg-[#F3EFEA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  aria-label="View shopping bag"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {isHydrated && totalCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#1C1917] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md border border-[#FAF8F5]"
                    >
                      {totalCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer onProceedCheckout={onProceedCheckout} />

      {/* Luxury Interactive Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E9E3DB] shadow-2xl rounded-2xl p-6 z-10"
            >
              <div className="flex items-center justify-between border-b border-[#E9E3DB] pb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-[#C5A059]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Polki chokers, Kundan earrings, bangles..."
                    className="w-full bg-transparent text-lg font-serif placeholder:font-sans placeholder:text-sm placeholder:text-[#78716C] text-[#1C1917] focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3EFEA] text-[#1C1917]"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-[#78716C] mb-2 font-medium">
                  Popular Curations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Polki Choker",
                    "Kundan Chandbali",
                    "Bridal Sets",
                    "18K Gold Kada",
                    "Meenakari Jhumkas",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setSearchOpen(false);
                        const element = document.getElementById("products");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3.5 py-1.5 rounded-full text-xs bg-[#F3EFEA] hover:bg-[#E8D7D0] text-[#1C1917] transition-colors border border-[#E9E3DB]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

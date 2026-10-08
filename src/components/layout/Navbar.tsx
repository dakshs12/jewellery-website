"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Search, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";
import AnnouncementBar from "./AnnouncementBar";
import { COLLECTIONS, CollectionCategory } from "@/data/collections";

interface NavbarProps {
  onProceedCheckout?: () => void;
}

export default function Navbar({ onProceedCheckout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCollection, setHoveredCollection] = useState<CollectionCategory>(COLLECTIONS[0]);
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
              {/* Left Side: Mobile Hamburger OR Desktop HOME & COLLECTION */}
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

                {/* Desktop Nav Links: HOME | COLLECTION */}
                <div className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium text-[#1C1917]">
                  <Link
                    href="/"
                    className="relative py-2 hover:text-[#C5A059] transition-colors group"
                  >
                    <span>HOME</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                  </Link>

                  <div className="relative group">
                    <Link
                      href="/#collections"
                      className="py-2 hover:text-[#C5A059] transition-colors flex items-center gap-1.5"
                    >
                      <span>COLLECTION</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-[#78716C]" />
                    </Link>

                    {/* Luxury Grand Mega-Menu */}
                    <div className="absolute top-full left-0 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                      <div className="w-[880px] xl:w-[920px] max-w-[calc(100vw-48px)] bg-[#FAF8F5] border border-[#E2D9CC] shadow-[0_30px_70px_rgba(28,25,23,0.22)] rounded-3xl p-6 sm:p-7">
                        {/* Top Accent Header */}
                        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E9E3DB]">
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
                              Signature Collections
                            </span>
                          </div>
                          <span className="text-xs font-serif italic text-[#78716C]">
                            7 Disciplines of Ancestral Craftsmanship
                          </span>
                        </div>

                        {/* Dual Column Layout: Categories Grid + Interactive Visual Spotlight */}
                        <div className="grid grid-cols-12 gap-6 items-stretch">
                          {/* Left Column: 7 Categories + 1 Complete Collection Card */}
                          <div className="col-span-7 grid grid-cols-2 gap-2.5">
                            {COLLECTIONS.map((col) => {
                              const isSelected = hoveredCollection.id === col.id;
                              return (
                                <Link
                                  key={col.id}
                                  href={`/products?category=${encodeURIComponent(col.name)}`}
                                  onMouseEnter={() => setHoveredCollection(col)}
                                  className={`group/item flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 border ${
                                    isSelected
                                      ? "bg-[#F3ECE0] border-[#C5A059]/40 text-[#1C1917] shadow-sm"
                                      : "bg-transparent border-transparent hover:bg-[#F5EFE6] text-[#1C1917]"
                                  }`}
                                >
                                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E5DDD2] bg-[#F3EFEA]">
                                    <Image
                                      src={col.image}
                                      alt={col.name}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                                      sizes="44px"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0 pr-1">
                                    <div className="flex items-center justify-between">
                                      <span
                                        className={`font-serif text-[15px] font-semibold transition-colors truncate ${
                                          isSelected
                                            ? "text-[#C5A059]"
                                            : "text-[#1C1917] group-hover/item:text-[#C5A059]"
                                        }`}
                                      >
                                        {col.name}
                                      </span>
                                      <ArrowRight
                                        className={`w-3.5 h-3.5 text-[#C5A059] transition-all duration-200 shrink-0 ${
                                          isSelected
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                        }`}
                                      />
                                    </div>
                                    <span className="text-[11px] text-[#78716C] block font-sans truncate mt-0.5 leading-snug">
                                      {col.subtitle}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}

                            {/* 8th Balanced Slot: View All Heirlooms */}
                            <Link
                              href="/products"
                              onMouseEnter={() => setHoveredCollection(COLLECTIONS[0])}
                              className="group/item flex items-center justify-between p-2.5 rounded-2xl border border-dashed border-[#C5A059]/50 bg-[#FAF8F5] hover:bg-[#F5EFE6] hover:border-[#C5A059] transition-all"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 rounded-xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] shrink-0 group-hover/item:bg-[#C5A059] group-hover/item:text-white transition-colors">
                                  <Sparkles className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="font-serif text-[15px] font-semibold text-[#1C1917] group-hover/item:text-[#C5A059] transition-colors block truncate">
                                    All Heirlooms
                                  </span>
                                  <span className="text-[11px] text-[#78716C] block font-sans truncate">
                                    Complete Atelier Catalog
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0 transition-transform duration-200 group-hover/item:translate-x-1 mr-1" />
                            </Link>
                          </div>

                          {/* Right Column: Dynamic Interactive Spotlight Stage */}
                          <div className="col-span-5 relative flex flex-col">
                            <Link
                              href={`/products?category=${encodeURIComponent(hoveredCollection.name)}`}
                              className="group/spotlight relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-[#E2D9CC] bg-[#1C1917] flex flex-col justify-end p-6 transition-all duration-300 shadow-md"
                            >
                              {/* Background Image Preview */}
                              <div className="absolute inset-0">
                                <Image
                                  key={hoveredCollection.id}
                                  src={hoveredCollection.image}
                                  alt={hoveredCollection.name}
                                  fill
                                  className="object-cover transition-all duration-700 ease-out group-hover/spotlight:scale-105"
                                  sizes="380px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/45 to-black/15" />
                              </div>

                              {/* Top Floating Badge */}
                              <div className="relative z-10 self-start mb-auto">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-[10px] font-sans font-semibold tracking-wider text-[#1C1917] uppercase shadow-md">
                                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                                  {hoveredCollection.pieceCount} Curated Pieces
                                </span>
                              </div>

                              {/* Bottom Details */}
                              <div className="relative z-10 text-white space-y-1">
                                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#E8D7B5] font-medium block">
                                  Handcrafted Discipline
                                </span>
                                <h4 className="font-serif text-2xl font-semibold leading-tight text-[#FAF8F5]">
                                  {hoveredCollection.name}
                                </h4>
                                <p className="text-xs text-stone-200/90 font-sans leading-relaxed pt-0.5">
                                  {hoveredCollection.subtitle}
                                </p>
                                <div className="pt-2.5 flex items-center gap-1.5 text-xs font-serif font-medium text-[#C5A059] group-hover/spotlight:text-[#E8D7B5] transition-colors">
                                  <span>Explore {hoveredCollection.name}</span>
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/spotlight:translate-x-1" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Bottom Heritage Quality Strip */}
                        <div className="mt-5 pt-4 border-t border-[#E9E3DB] flex items-center justify-between">
                          <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-xs font-serif font-semibold text-[#C5A059] hover:text-[#9A7B38] transition-colors group/viewall"
                          >
                            <span>Browse Complete Catalogue (240+ Heirlooms)</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/viewall:translate-x-1" />
                          </Link>

                          <div className="flex items-center gap-3 text-[10px] tracking-wider text-[#78716C] uppercase font-sans">
                            <span className="flex items-center gap-1.5">
                              <span className="text-[#C5A059]">✦</span> Free Delivery Above ₹2,000
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#D6CEBE]" />
                            <span className="flex items-center gap-1.5">
                              <span className="text-[#C5A059]">✦</span> 100% Anti-Tarnish
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Brand Logo */}
              <div className="flex flex-col items-center justify-center text-center">
                <Link
                  href="/"
                  className="group focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded-sm px-2 flex items-center justify-center py-0.5"
                >
                  <Image
                    src="/2.svg"
                    alt="Anayas"
                    width={280}
                    height={142}
                    priority
                    className="h-14 sm:h-16 md:h-[70px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </Link>
              </div>

              {/* Right Side: SEARCH & CART Action Icons */}
              <div className="flex items-center justify-end gap-3 sm:gap-4 lg:w-1/3">

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

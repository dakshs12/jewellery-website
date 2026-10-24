"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Search, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { useHydratedCart } from "@/hooks/useHydratedCart";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";
import { COLLECTIONS, CollectionCategory } from "@/data/collections";
import Logo from "@/components/common/Logo";

interface NavbarProps {
  onProceedCheckout?: () => void;
}

const ALL_PRODUCTS_SPOTLIGHT = {
  id: "all-products",
  name: "All Products",
  image: "/5000RS.png",
  href: "/products",
};

export default function Navbar({ onProceedCheckout }: NavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpotlight, setActiveSpotlight] = useState({
    id: COLLECTIONS[0].id,
    name: COLLECTIONS[0].name,
    image: COLLECTIONS[0].image,
    href: `/products?category=${encodeURIComponent(COLLECTIONS[0].name)}`,
  });
  const { totalCount, openCart, isHydrated } = useHydratedCart();

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Main Navbar */}
        <nav className="w-full bg-[#EAD5BE] backdrop-blur-md border-b border-[#D8C2AA] transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 sm:h-24 lg:h-[100px]">
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
                      <div className="w-[960px] xl:w-[1020px] max-w-[calc(100vw-48px)] bg-[#FFF6EA] border border-[#E2D9CC] shadow-[0_30px_70px_rgba(28,25,23,0.22)] rounded-3xl p-6 sm:p-7">
                        {/* Dual Column Layout: Categories Grid + Interactive Visual Spotlight */}
                        <div className="grid grid-cols-12 gap-6 items-stretch">
                          {/* Left Column: 7 Categories + 1 Complete Collection Card */}
                          <div className="col-span-7 grid grid-cols-2 gap-2.5">
                            {COLLECTIONS.map((col) => {
                              const isSelected = activeSpotlight.id === col.id;
                              return (
                                <Link
                                  key={col.id}
                                  href={`/products?category=${encodeURIComponent(col.name)}`}
                                  onMouseEnter={() =>
                                    setActiveSpotlight({
                                      id: col.id,
                                      name: col.name,
                                      image: col.image,
                                      href: `/products?category=${encodeURIComponent(col.name)}`,
                                    })
                                  }
                                  className={`group/item flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 border ${
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
                                  <div className="flex-1 min-w-0 pr-1 flex items-center justify-between">
                                    <span
                                      className={`font-serif text-[14px] sm:text-[14.5px] font-semibold tracking-wider uppercase transition-colors whitespace-nowrap ${
                                        isSelected
                                          ? "text-[#C5A059]"
                                          : "text-[#1C1917] group-hover/item:text-[#C5A059]"
                                      }`}
                                    >
                                      {col.name}
                                    </span>
                                    <ArrowRight
                                      className={`w-3.5 h-3.5 text-[#C5A059] transition-all duration-200 shrink-0 ml-1.5 ${
                                        isSelected
                                          ? "opacity-100 translate-x-0"
                                          : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                      }`}
                                    />
                                  </div>
                                </Link>
                              );
                            })}

                            {/* 8th Balanced Slot: View All Products */}
                            <Link
                              href="/products"
                              onMouseEnter={() => setActiveSpotlight(ALL_PRODUCTS_SPOTLIGHT)}
                              className={`group/item flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 border ${
                                activeSpotlight.id === "all-products"
                                  ? "bg-[#F3ECE0] border-[#C5A059]/40 text-[#1C1917] shadow-sm"
                                  : "bg-transparent border-dashed border-[#C5A059]/40 hover:bg-[#F5EFE6] text-[#1C1917]"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div
                                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    activeSpotlight.id === "all-products"
                                      ? "bg-[#C5A059] text-white"
                                      : "bg-[#C5A059]/10 text-[#C5A059] group-hover/item:bg-[#C5A059] group-hover/item:text-white"
                                  }`}
                                >
                                  <Sparkles className="w-4 h-4" />
                                </div>
                                <span
                                  className={`font-serif text-[14px] sm:text-[14.5px] font-semibold tracking-wider uppercase transition-colors block whitespace-nowrap ${
                                    activeSpotlight.id === "all-products"
                                      ? "text-[#C5A059]"
                                      : "text-[#1C1917] group-hover/item:text-[#C5A059]"
                                  }`}
                                >
                                  All Products
                                </span>
                              </div>
                              <ArrowRight
                                className={`w-3.5 h-3.5 text-[#C5A059] shrink-0 transition-all duration-200 mr-1 ml-1.5 ${
                                  activeSpotlight.id === "all-products"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                }`}
                              />
                            </Link>
                          </div>

                          {/* Right Column: Dynamic Interactive Spotlight Stage */}
                          <div className="col-span-5 relative flex flex-col">
                            <Link
                              href={activeSpotlight.href}
                              className="group/spotlight relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-[#E2D9CC] bg-[#1C1917] flex flex-col justify-end p-6 transition-all duration-300 shadow-md"
                            >
                              {/* Background Image Preview */}
                              <div className="absolute inset-0">
                                <Image
                                  key={activeSpotlight.id}
                                  src={activeSpotlight.image}
                                  alt={activeSpotlight.name}
                                  fill
                                  className="object-cover transition-all duration-700 ease-out group-hover/spotlight:scale-105"
                                  sizes="380px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              </div>

                              {/* Bottom Details - Only the Explore label */}
                              <div className="relative z-10 flex items-center gap-2 text-xs font-serif font-semibold tracking-wider uppercase text-[#FAF8F5] group-hover/spotlight:text-[#C5A059] transition-colors drop-shadow-md">
                                <span>Explore {activeSpotlight.name}</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/spotlight:translate-x-1 text-[#C5A059]" />
                              </div>
                            </Link>
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
                  <Logo className="h-16 sm:h-20 md:h-[84px] lg:h-[92px] w-auto transition-transform duration-200 group-hover:scale-[1.03]" />
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
                      className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#1C1917] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md border border-[#EAD5BE]"
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
              className="relative w-full max-w-2xl bg-[#FFF6EA] border border-[#E9E3DB] shadow-2xl rounded-2xl p-6 z-10"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setSearchOpen(false);
                    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="flex items-center justify-between border-b border-[#E9E3DB] pb-4"
              >
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
              </form>

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
                        router.push(`/products?search=${encodeURIComponent(tag)}`);
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

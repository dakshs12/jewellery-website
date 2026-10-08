"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, Sparkles, Search, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import GuestCheckoutModal from "@/components/checkout/GuestCheckoutModal";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { COLLECTIONS } from "@/data/collections";
import { Product, ProductCategory } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CATEGORIES: { label: string; value: ProductCategory | "ALL" }[] = [
  { label: "All Heirlooms", value: "ALL" },
  { label: "Necklace", value: "Necklace" },
  { label: "Pendant Sets", value: "Pendant Sets" },
  { label: "Everyday Wear", value: "Everyday Wear" },
  { label: "Earrings", value: "Earrings" },
  { label: "Rings", value: "Rings" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Mangalsutra", value: "Mangalsutra" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "ALL">(
    (categoryParam as ProductCategory) || "ALL"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestsellers">("featured");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const closeCart = useCartStore((state) => state.closeCart);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sync category when URL changes
  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) => c.value.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.value);
        return;
      }
    }
    setSelectedCategory("ALL");
  }, [categoryParam]);

  const handleSelectCategory = (cat: ProductCategory | "ALL") => {
    setSelectedCategory(cat);
    if (cat === "ALL") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const currentCollectionMeta = useMemo(() => {
    if (selectedCategory === "ALL") return null;
    return COLLECTIONS.find((c) => c.name.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specifications.material.toLowerCase().includes(q) ||
          p.specifications.stones.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    } else if (sortBy === "bestsellers") {
      list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Subtle GSAP stagger animation on products grid whenever filter changes
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const items = gridRef.current.children;
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
      }
    },
    { dependencies: [selectedCategory, sortBy, searchQuery], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar onProceedCheckout={() => { closeCart(); setCheckoutOpen(true); }} />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs text-[#78716C] mb-6 font-medium">
            <Link href="/" className="hover:text-[#1C1917] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" />
            <Link href="/products" className="hover:text-[#1C1917] transition-colors">
              Collections
            </Link>
            {selectedCategory !== "ALL" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span className="text-[#1C1917] font-semibold">{selectedCategory}</span>
              </>
            )}
          </nav>

          {/* Dynamic Editorial Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 mb-2 text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                {currentCollectionMeta?.subtitle || "Artisanal Heirlooms"}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] tracking-tight">
              {currentCollectionMeta?.name || "Curated Heirloom Gallery"}
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#78716C] mt-3 leading-relaxed">
              {currentCollectionMeta?.description ||
                "Handcrafted in Jaipur with 22K antique micron gold plating, uncut synthetic Polki diamonds, and genuine pearl drops."}
            </p>
          </div>

          {/* Filter Bar: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#E9E3DB]">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleSelectCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 min-h-[40px] flex items-center justify-center ${
                    isActive
                      ? "bg-[#1C1917] text-[#FAF8F5] shadow-sm font-semibold"
                      : "bg-[#F3EFEA] text-[#1C1917] hover:bg-[#E8D7D0] border border-[#E9E3DB]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Controls Bar: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by piece or stone..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#F3EFEA] border border-[#E9E3DB] text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C5A059] min-h-[42px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results count & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs text-[#78716C]">
                Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> creations
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#78716C]" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "featured" | "price-asc" | "price-desc" | "bestsellers"
                    )
                  }
                  className="bg-[#F3EFEA] border border-[#E9E3DB] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer min-h-[42px]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="bestsellers">Bestsellers First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== "ALL" || searchQuery) && (
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <span className="text-xs text-[#78716C]">Active Filters:</span>
              {selectedCategory !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory("ALL")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-medium"
                >
                  Category: {selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-medium"
                >
                  Query: {searchQuery}
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-xs text-[#C5A059] hover:underline font-medium ml-2"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center bg-[#F4EFEA]/60 rounded-3xl border border-[#E5DDD2] my-8">
              <h3 className="font-serif text-2xl text-[#1C1917]">No Heirlooms Found</h3>
              <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
                No pieces matched your selected filter or search terms. Try selecting another category or resetting the filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory("ALL");
                  setSearchQuery("");
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#C5A059] text-[#1C1917] font-semibold text-xs uppercase tracking-wider"
              >
                View All Heirlooms
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <GuestCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C5A059]" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

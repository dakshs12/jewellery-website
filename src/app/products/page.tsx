"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, X, ChevronDown, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import GuestCheckoutModal from "@/components/checkout/GuestCheckoutModal";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { COLLECTIONS } from "@/data/collections";
import { Product, ProductCategory } from "@/types/database";
import { useCartStore } from "@/store/useCartStore";
import { getProducts } from "@/lib/sanity/queries";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CATEGORIES: { label: string; value: ProductCategory | "ALL" }[] = [
  { label: "All Jewellery", value: "ALL" },
  { label: "Necklace", value: "Necklace" },
  { label: "Pendant Sets", value: "Pendant Sets" },
  { label: "Everyday Wear", value: "Everyday Wear" },
  { label: "Earrings", value: "Earrings" },
  { label: "Rings", value: "Rings" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Mangalsutra", value: "Mangalsutra" },
];

const SORT_OPTIONS: { label: string; value: "featured" | "price-asc" | "price-desc" | "bestsellers" }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Bestsellers", value: "bestsellers" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search") || searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "ALL">(
    (categoryParam as ProductCategory) || "ALL"
  );
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestsellers">("featured");
  const [openDropdown, setOpenDropdown] = useState<"category" | "price" | "sort" | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const closeCart = useCartStore((state) => state.closeCart);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Fetch products from Sanity with zero-crash fallback
  useEffect(() => {
    let isMounted = true;
    getProducts().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProducts(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync searchQuery when URL query parameter changes
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const selectedCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((c) => c.value === selectedCategory);
    return found ? found.label : "All Jewellery";
  }, [selectedCategory]);

  const selectedSortLabel = useMemo(() => {
    const found = SORT_OPTIONS.find((s) => s.value === sortBy);
    return found ? found.label : "Featured";
  }, [sortBy]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (maxPrice < 10000) {
      list = list.filter((p) => (p.sale_price ?? p.price) <= maxPrice);
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
  }, [products, selectedCategory, maxPrice, searchQuery, sortBy]);

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
    { dependencies: [selectedCategory, sortBy, searchQuery, maxPrice], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#FFF6EA]">
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

          {/* Header */}
          <div className="max-w-3xl mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight">
              {currentCollectionMeta?.name || "Our Products"}
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#78716C] mt-3 leading-relaxed">
              From subtle everyday favourites to statement-making pieces, find the jewellery that speaks your style.
            </p>
          </div>

          {/* 3 Underlined Tools in 1 Line/Row */}
          <div ref={toolsRef} className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-12 mb-8">
            {/* 1. CATEGORY */}
            <div className="relative">
              <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-1.5 sm:mb-2 truncate">
                CATEGORY
              </span>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                className="w-full flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#1C1917] text-left cursor-pointer focus:outline-none group"
                aria-expanded={openDropdown === "category"}
              >
                <span className="font-sans font-semibold text-xs sm:text-base lg:text-[17px] text-[#1C1917] truncate">
                  {selectedCategoryLabel}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1917] transition-transform duration-200 shrink-0 ml-1 sm:ml-2 ${
                    openDropdown === "category" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Dropdown */}
              {openDropdown === "category" && (
                <div className="absolute left-0 top-full mt-2 w-[min(260px,calc(100vw-32px))] bg-[#FFF6EA] border border-[#E9E3DB] rounded-2xl shadow-xl p-2 z-40">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          handleSelectCategory(cat.value);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#1C1917] text-[#FAF8F5] font-semibold"
                            : "text-[#1C1917] hover:bg-[#F3EFEA]"
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. PRICE RANGE */}
            <div className="relative">
              <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-1.5 sm:mb-2 truncate">
                PRICE RANGE
              </span>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                className="w-full flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#1C1917] text-left cursor-pointer focus:outline-none group"
                aria-expanded={openDropdown === "price"}
              >
                <span className="font-sans font-semibold text-xs sm:text-base lg:text-[17px] text-[#1C1917] truncate">
                  {maxPrice >= 10000 ? "All prices" : `Under ₹${maxPrice.toLocaleString("en-IN")}`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1917] transition-transform duration-200 shrink-0 ml-1 sm:ml-2 ${
                    openDropdown === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Price Range Manual Slider Popover */}
              {openDropdown === "price" && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 top-full mt-2 w-[calc(100vw-32px)] sm:w-[320px] max-w-[320px] bg-[#FFF6EA] border border-[#E9E3DB] rounded-2xl shadow-xl p-4 sm:p-5 z-40">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                        Price Filter
                      </span>
                      <span className="font-serif text-sm font-bold text-[#1C1917]">
                        {maxPrice >= 10000 ? "All Prices" : `Up to ₹${maxPrice.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    {/* Manual Range Slider */}
                    <div>
                      <input
                        type="range"
                        min={1000}
                        max={10000}
                        step={250}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 bg-[#E9E3DB] rounded-lg appearance-none cursor-pointer accent-[#1C1917]"
                      />
                      <div className="flex items-center justify-between text-[11px] text-[#78716C] mt-1.5 font-medium">
                        <span>₹1,000</span>
                        <span>₹10,000</span>
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E9E3DB]">
                      <button
                        type="button"
                        onClick={() => setMaxPrice(3000)}
                        className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                          maxPrice === 3000 ? "bg-[#1C1917] text-[#FAF8F5] font-semibold" : "bg-[#F3EFEA] hover:bg-[#E8D7D0] text-[#1C1917]"
                        }`}
                      >
                        Under ₹3,000
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(5000)}
                        className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                          maxPrice === 5000 ? "bg-[#1C1917] text-[#FAF8F5] font-semibold" : "bg-[#F3EFEA] hover:bg-[#E8D7D0] text-[#1C1917]"
                        }`}
                      >
                        Under ₹5,000
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(7500)}
                        className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                          maxPrice === 7500 ? "bg-[#1C1917] text-[#FAF8F5] font-semibold" : "bg-[#F3EFEA] hover:bg-[#E8D7D0] text-[#1C1917]"
                        }`}
                      >
                        Under ₹7,500
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(10000)}
                        className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                          maxPrice >= 10000 ? "bg-[#1C1917] text-[#FAF8F5] font-semibold" : "bg-[#F3EFEA] hover:bg-[#E8D7D0] text-[#1C1917]"
                        }`}
                      >
                        All Prices
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E9E3DB]">
                      <button
                        type="button"
                        onClick={() => setMaxPrice(10000)}
                        className="text-xs text-[#78716C] hover:text-[#1C1917] underline cursor-pointer"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(null)}
                        className="px-3.5 py-1.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C5A059] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. SORT BY */}
            <div className="relative">
              <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-1.5 sm:mb-2 truncate">
                SORT BY
              </span>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                className="w-full flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#1C1917] text-left cursor-pointer focus:outline-none group"
                aria-expanded={openDropdown === "sort"}
              >
                <span className="font-sans font-semibold text-xs sm:text-base lg:text-[17px] text-[#1C1917] truncate">
                  {selectedSortLabel}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1917] transition-transform duration-200 shrink-0 ml-1 sm:ml-2 ${
                    openDropdown === "sort" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort Dropdown */}
              {openDropdown === "sort" && (
                <div className="absolute right-0 top-full mt-2 w-[min(240px,calc(100vw-32px))] bg-[#FFF6EA] border border-[#E9E3DB] rounded-2xl shadow-xl p-2 z-40">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#1C1917] text-[#FAF8F5] font-semibold"
                            : "text-[#1C1917] hover:bg-[#F3EFEA]"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== "ALL" || searchQuery || maxPrice < 10000) && (
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <span className="text-xs text-[#78716C]">Active Filters:</span>
              {selectedCategory !== "ALL" && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory("ALL")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-medium cursor-pointer"
                >
                  Category: {selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {maxPrice < 10000 && (
                <button
                  type="button"
                  onClick={() => setMaxPrice(10000)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-medium cursor-pointer"
                >
                  Price: Under ₹{maxPrice.toLocaleString("en-IN")}
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-medium cursor-pointer"
                >
                  Query: {searchQuery}
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory("ALL");
                  setMaxPrice(10000);
                  setSearchQuery("");
                }}
                className="text-xs text-[#C5A059] hover:underline font-medium ml-2 cursor-pointer"
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
                View All Products
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
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
        <div className="min-h-screen bg-[#FFF6EA] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C5A059]" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

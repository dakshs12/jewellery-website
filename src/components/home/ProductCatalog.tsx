"use client";

import { useState, useMemo } from "react";
import { Product, ProductCategory } from "@/types/database";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, Sparkles } from "lucide-react";

interface ProductCatalogProps {
  products: Product[];
}

const CATEGORIES: { label: string; value: ProductCategory | "ALL" }[] = [
  { label: "All Heirlooms", value: "ALL" },
  { label: "Necklaces & Chokers", value: "Necklace" },
  { label: "Pendant Sets", value: "Pendant Sets" },
  { label: "Everyday Wear", value: "Everyday Wear" },
  { label: "Statement Earrings", value: "Earrings" },
  { label: "Rings", value: "Rings" },
  { label: "Artisan Bracelets", value: "Bracelets" },
  { label: "Mangalsutra", value: "Mangalsutra" },
];

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestsellers">("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    } else if (sortBy === "bestsellers") {
      list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#78716C]">
              Artisanal Masterpieces
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1917] tracking-tight">
            Curated Heirloom Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] leading-relaxed">
            Each piece is masterfully fashioned using ancestral techniques — hand-set uncut stones, genuine Jaipur Meenakari, and rich micron gold.
          </p>
        </div>

        {/* Filter Tabs & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E9E3DB]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? "bg-[#1C1917] text-[#FAF8F5] shadow-sm"
                      : "bg-[#F3EFEA] text-[#1C1917] hover:bg-[#E8D7D0] border border-[#E9E3DB]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#78716C]" />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "featured" | "price-asc" | "price-desc" | "bestsellers"
                )
              }
              className="bg-[#F3EFEA] border border-[#E9E3DB] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C5A059] cursor-pointer min-h-[44px]"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestsellers">Bestsellers First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#1C1917]">No heirlooms found</p>
            <p className="text-sm text-[#78716C] mt-2">
              Try selecting another category or resetting the filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

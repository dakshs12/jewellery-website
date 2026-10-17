"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import TextLoopSeparator from "@/components/home/TextLoopSeparator";
import CollectionSection from "@/components/home/CollectionSection";
import ProductCatalog from "@/components/home/ProductCatalog";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramSection from "@/components/home/InstagramSection";
import Footer from "@/components/layout/Footer";
import GuestCheckoutModal from "@/components/checkout/GuestCheckoutModal";
import { useCartStore } from "@/store/useCartStore";
import { getProducts } from "@/lib/sanity/queries";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { Product } from "@/types/database";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const closeCart = useCartStore((state) => state.closeCart);

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

  const handleOpenCheckout = () => {
    closeCart();
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EA] selection:bg-[#E8D7D0] selection:text-[#1C1917]">
      {/* 1. Navbar: HOME | COLLECTION | LOGO | SEARCH | CART */}
      <Navbar onProceedCheckout={handleOpenCheckout} />

      {/* Main Luxury Storefront Flow */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroBanner />

        {/* Text Loop Separator Ribbon */}
        <TextLoopSeparator />

        {/* 3. Shop by Collection (7 Category Cards linking to filtered product page) */}
        <CollectionSection />

        {/* 4. Curated Heirlooms Product Catalog from Sanity CMS / Fallback */}
        <ProductCatalog products={products} />

        {/* 5. Reviews Section (Patron Comments & Stories - No Star/Metric clutter) */}
        <ReviewsSection />

        {/* 6. Social Media Instagram Section (Split Horizon & Terracotta Card for @_anayasjewels) */}
        <InstagramSection />
      </main>

      {/* 6. Footer (Native 3.svg Logo & 7 Collection Links) */}
      <Footer />

      {/* Guest Express Checkout Modal */}
      <GuestCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

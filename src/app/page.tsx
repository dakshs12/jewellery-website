"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import CollectionSection from "@/components/home/CollectionSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramSection from "@/components/home/InstagramSection";
import Footer from "@/components/layout/Footer";
import GuestCheckoutModal from "@/components/checkout/GuestCheckoutModal";
import { useCartStore } from "@/store/useCartStore";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const closeCart = useCartStore((state) => state.closeCart);

  const handleOpenCheckout = () => {
    closeCart();
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-[#E8D7D0] selection:text-[#1C1917]">
      {/* 1. Navbar: HOME | COLLECTION | LOGO | SEARCH | CART */}
      <Navbar onProceedCheckout={handleOpenCheckout} />

      {/* Main Luxury Storefront Flow */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroBanner />

        {/* 3. Shop by Collection (7 Category Cards linking to filtered product page) */}
        <CollectionSection />

        {/* 4. Reviews Section (Patron Comments & Stories - No Star/Metric clutter) */}
        <ReviewsSection />

        {/* 5. Social Media Instagram Section (Split Horizon & Terracotta Card for @_anayasjewels) */}
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

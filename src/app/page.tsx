"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import ProductCatalog from "@/components/home/ProductCatalog";
import ArtisanStory from "@/components/home/ArtisanStory";
import Footer from "@/components/layout/Footer";
import GuestCheckoutModal from "@/components/checkout/GuestCheckoutModal";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
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
      {/* Responsive Navigation Header */}
      <Navbar onProceedCheckout={handleOpenCheckout} />

      {/* Main Luxury Storefront Presentation */}
      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <HeroBanner />

        {/* Curated Product Gallery & Filters */}
        <ProductCatalog products={MOCK_PRODUCTS} />

        {/* Brand Artisan & Heritage Story */}
        <ArtisanStory />
      </main>

      {/* Luxury Editorial Footer */}
      <Footer />

      {/* Guest Express Checkout Modal */}
      <GuestCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

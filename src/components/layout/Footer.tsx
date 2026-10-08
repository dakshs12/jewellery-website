import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-12 pb-12 border-t border-[#2E2925]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4-Column Editorial Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E2925]">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block mb-4 focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded"
            >
              <Image
                src="/3.svg"
                alt="Anayas"
                width={240}
                height={122}
                className="h-14 sm:h-16 w-auto object-contain transition-opacity hover:opacity-90"
              />
            </Link>
            <p className="text-sm text-[#A8A29E] max-w-sm leading-relaxed mb-6">
              Artisanal imitation jewellery bridging ancestral royal Indian techniques with contemporary silhouettes. Designed for weddings, festivities, and heirloom keepsakes.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Insured BlueDart Express Delivery Across India</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <Link href="/products?category=Necklace" className="hover:text-white transition-colors">
                  Necklace
                </Link>
              </li>
              <li>
                <Link href="/products?category=Pendant%20Sets" className="hover:text-white transition-colors">
                  Pendant Sets
                </Link>
              </li>
              <li>
                <Link href="/products?category=Everyday%20Wear" className="hover:text-white transition-colors">
                  Everyday Wear
                </Link>
              </li>
              <li>
                <Link href="/products?category=Earrings" className="hover:text-white transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/products?category=Rings" className="hover:text-white transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=Bracelets" className="hover:text-white transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/products?category=Mangalsutra" className="hover:text-white transition-colors">
                  Mangalsutra
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Client Care */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <span className="block text-white font-medium">Bridal WhatsApp Desk</span>
                <span className="text-[11px]">+91 98765 43210 (10 AM - 8 PM IST)</span>
              </li>
              <li className="pt-1">
                <span className="block text-white font-medium">Custom Size Inquiries</span>
                <span className="text-[11px]">concierge@anayasjewels.com</span>
              </li>
              <li className="pt-1">
                <span className="block text-white font-medium">Care & Longevity Guide</span>
                <span className="text-[11px]">Anti-tarnish storage instructions</span>
              </li>
            </ul>
          </div>

          {/* Shipping & Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>Free Express Delivery &gt; ₹2,000</li>
              <li>Tamper-proof Velvet Box Packaging</li>
              <li>Razorpay Standard 256-bit SSL</li>
              <li>Guest Checkout Supported</li>
              <li>Directus CMS Order Dispatch Tracking</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} ANAYAS LUXURY JEWELLERY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#292524] border border-[#3E3835] text-[11px] text-[#A8A29E]">
              Razorpay Secured
            </span>
            <span className="px-2.5 py-1 rounded bg-[#292524] border border-[#3E3835] text-[11px] text-[#A8A29E]">
              UPI / Cards / NetBanking
            </span>
            <span className="px-2.5 py-1 rounded bg-[#292524] border border-[#3E3835] text-[11px] text-[#A8A29E]">
              BlueDart Logistics
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

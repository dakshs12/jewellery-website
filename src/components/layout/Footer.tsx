import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Phone, Mail, MapPin, Truck, RotateCcw, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-14 pb-12 border-t border-[#2E2925]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2E2925]">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded"
            >
              <Image
                src="/3.svg"
                alt="Anayas"
                width={240}
                height={122}
                className="h-14 sm:h-16 w-auto object-contain transition-opacity hover:opacity-90"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
              Demi-fine jewellery for all your occasions. Elegant designs that feel like you and feel real.
            </p>
            <div className="space-y-2 pt-1 text-xs text-[#C5A059]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Delivery Across India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Collections
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <Link href="/products?category=Necklace" className="hover:text-white transition-colors">
                  Necklaces
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

          {/* Column 4: Contact & Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Concierge
            </h4>
            <div className="space-y-3 text-xs text-[#A8A29E]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919893020204" className="hover:text-white transition-colors font-medium">
                    +91 98930 20204
                  </a>
                  <p className="text-[11px] text-[#78716C]">Mon–Sat: 10 AM – 7 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:anayasjewels9@gmail.com" className="hover:text-white transition-colors block">
                    anayasjewels9@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span className="text-[#78716C]">Indore, Madhya Pradesh, India</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block py-2 px-4 rounded-full bg-[#2E2925] text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#1C1917] transition-all"
                >
                  Contact Concierge →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} ANAYAS LUXURY JEWELLERY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>100% Secure Checkout powered by Razorpay (UPI • Cards • NetBanking)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

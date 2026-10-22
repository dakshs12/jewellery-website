import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-12 pb-12 border-t border-[#2E2925]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Directory */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-12 border-b border-[#2E2925]">
          {/* Brand Info */}
          <div className="max-w-md">
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
            <p className="text-sm text-[#A8A29E] leading-relaxed mb-6">
              Artisanal imitation jewellery bridging ancestral royal Indian techniques with contemporary silhouettes. Designed for weddings, festivities, and heirloom keepsakes.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Delivery Across India</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4">
              Collections
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-2.5 text-xs text-[#A8A29E]">
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
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} ANAYAS LUXURY JEWELLERY. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

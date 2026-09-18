"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2E2925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / Salon Invitation */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#292524] border border-[#3E3835] mb-16 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3 text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
                Private Salon Invitation
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Receive First Access to Limited Bridal Edits
            </h3>
            <p className="text-sm text-[#A8A29E] leading-relaxed mb-6">
              Members of the Anayas Salon receive curated styling lookbooks, private trunk show invites, and complimentary express upgrades.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-[#1C1917] border border-[#3E3835] rounded-full pl-11 pr-4 py-3 text-sm text-[#FAF8F5] placeholder:text-[#78716C] focus:outline-none focus:border-[#C5A059] min-h-[44px]"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#1C1917] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] shadow-md"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Request Invitation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Editorial Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E2925]">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.25em] block mb-3">
              ANAYAS
            </span>
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
                <Link href="/#necklaces" className="hover:text-white transition-colors">
                  Polki & Kundan Chokers
                </Link>
              </li>
              <li>
                <Link href="/#earrings" className="hover:text-white transition-colors">
                  Chandbalis & Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/#bangles" className="hover:text-white transition-colors">
                  18K Gold Plated Kadas
                </Link>
              </li>
              <li>
                <Link href="/#bridal-sets" className="hover:text-white transition-colors">
                  Imperial Bridal Ensembles
                </Link>
              </li>
              <li>
                <Link href="/#bestsellers" className="hover:text-white transition-colors">
                  Bestseller Gallery
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
              <li>Complimentary Shipping &gt; ₹3,000</li>
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

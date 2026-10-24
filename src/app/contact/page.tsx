import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Concierge",
  description:
    "Get in touch with Anayas Jewels concierge for order assistance, bespoke styling consultations, tracking updates, and questions.",
  alternates: {
    canonical: "https://anayasjewels.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EA] text-[#1C1917]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#78716C] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1C1917] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1C1917] font-medium">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E6D5C3] pb-8 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAD5BE]/50 border border-[#D8C2AA] text-[11px] uppercase tracking-widest text-[#1C1917] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Patron Concierge & Assistance
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917]">
            We’d Love to Hear From You
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-2xl leading-relaxed">
            Whether you have a question about an heirloom piece, need styling assistance for a wedding, or want an update on your order transit, our team is at your service.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp / Phone */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-[#E9E3DB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FFF6EA] border border-[#EAD5BE] flex items-center justify-center text-[#C5A059] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-2">WhatsApp & Call</h3>
              <p className="text-xs sm:text-sm text-[#78716C] mb-4">
                Instant styling recommendations, dispatch queries, and quick assistance.
              </p>
              <p className="font-sans font-bold text-base text-[#1C1917] tracking-tight">
                +91 98930 20204
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://wa.me/919893020204?text=Hi%20Anayas%20Jewels,%20I%20have%20an%20inquiry%20regarding%20jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Email Support */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-[#E9E3DB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FFF6EA] border border-[#EAD5BE] flex items-center justify-center text-[#C5A059] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-2">Email Support</h3>
              <p className="text-xs sm:text-sm text-[#78716C] mb-4">
                Invoices, bulk order queries, bridal styling, or order modifications.
              </p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-semibold text-[#1C1917]">anayasjewels9@gmail.com</p>
                <p className="text-[#78716C]">info@anayasjewels.com</p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="mailto:anayasjewels9@gmail.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
              >
                <Mail className="w-4 h-4" />
                Write to Us
              </a>
            </div>
          </div>

          {/* Operational Hours & Location */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-[#E9E3DB] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#FFF6EA] border border-[#EAD5BE] flex items-center justify-center text-[#C5A059] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-2">Studio Hours</h3>
              <p className="text-xs sm:text-sm text-[#78716C] mb-4">
                Our customer concierge is active during business hours:
              </p>
              <div className="space-y-1.5 text-xs sm:text-sm text-[#1C1917]">
                <p><strong>Monday – Saturday:</strong> 10:00 AM – 7:00 PM IST</p>
                <p className="text-[#78716C]">Sunday: Closed (Orders dispatched next business day)</p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-[#78716C]">
                  <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="https://www.instagram.com/_anayasjewels/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#EAD5BE] text-[#1C1917] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-white transition-colors"
              >
                Instagram @_anayasjewels
              </a>
            </div>
          </div>
        </div>

        {/* Business & Legal Credentials Box for Razorpay Compliance */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7EFE4] border border-[#E6D5C3]/80">
          <div className="flex items-center gap-2.5 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Business Registration & Merchant Identity
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#57534E] pt-2">
            <div>
              <p className="text-[#78716C] uppercase tracking-wider text-[10px]">Merchant Name</p>
              <p className="font-semibold text-[#1C1917] mt-0.5">Anayas Jewels</p>
            </div>
            <div>
              <p className="text-[#78716C] uppercase tracking-wider text-[10px]">Operational City</p>
              <p className="font-semibold text-[#1C1917] mt-0.5">Indore, Madhya Pradesh, India</p>
            </div>
            <div>
              <p className="text-[#78716C] uppercase tracking-wider text-[10px]">Online Storefront</p>
              <p className="font-semibold text-[#1C1917] mt-0.5">anayasjewels.com</p>
            </div>
            <div>
              <p className="text-[#78716C] uppercase tracking-wider text-[10px]">Payment Partner</p>
              <p className="font-semibold text-[#1C1917] mt-0.5">Razorpay (RBI Licensed)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

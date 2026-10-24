import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Learn about our complimentary insured domestic shipping, dispatch timelines, courier partners, and packaging at Anayas Jewels.",
  alternates: {
    canonical: "https://anayasjewels.com/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EA] text-[#1C1917]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#78716C] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1C1917] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1C1917] font-medium">Shipping & Delivery Policy</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E6D5C3] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAD5BE]/50 border border-[#D8C2AA] text-[11px] uppercase tracking-widest text-[#1C1917] font-semibold mb-3">
            <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
            Domestic Logistics & Fulfillment
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917]">
            Shipping & Delivery Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-2xl leading-relaxed">
            Every piece from Anayas is packed with artisanal care in tamper-proof heirloom packaging, fully insured during transit to your doorstep.
          </p>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <Clock className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Fast Dispatch</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Orders are dispatched within <strong>1–2 business days</strong> of payment verification.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <Sparkles className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Free Shipping</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Complimentary express shipping on all orders of <strong>₹3,000 and above</strong>. Standard ₹199 fee below ₹3,000.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Insured Transit</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Delivered via trusted partners (BlueDart, Delhivery, DTDC) with live SMS & email tracking.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-[#44403C]">
          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              1. Delivery Coverage & Timelines
            </h2>
            <p>
              Anayas Jewels delivers to over 19,000+ pin codes across India. Our standard delivery timelines from dispatch are:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2–4 business days.</li>
              <li><strong>Tier 2 & Tier 3 Cities / Regional Hubs:</strong> 3–6 business days.</li>
              <li><strong>Remote / North-East / J&K locations:</strong> 5–8 business days.</li>
            </ul>
            <p className="mt-3 text-xs text-[#78716C]">
              * Delivery timelines may be marginally extended during national public holidays, extreme weather events, or high festive peak seasons (Diwali, Karwa Chauth, Dhanteras).
            </p>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              2. Shipping Charges & Thresholds
            </h2>
            <p>
              We believe in transparent pricing with zero surprise charges at checkout:
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#E9E3DB]">
              <table className="min-w-full divide-y divide-[#E9E3DB] text-left text-xs sm:text-sm">
                <thead className="bg-[#F7EFE4] text-[#1C1917] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Order Value</th>
                    <th className="px-4 py-3">Shipping Cost</th>
                    <th className="px-4 py-3">Service Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E3DB] bg-white">
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#1C1917]">₹3,000 and above</td>
                    <td className="px-4 py-3 font-semibold text-[#2D4F3E]">FREE (Complimentary)</td>
                    <td className="px-4 py-3 text-[#78716C]">Insured Express Courier</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#1C1917]">Under ₹3,000</td>
                    <td className="px-4 py-3 font-semibold text-[#1C1917]">₹199 flat fee</td>
                    <td className="px-4 py-3 text-[#78716C]">Insured Standard Courier</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              3. Order Tracking & Real-Time Updates
            </h2>
            <p>
              Once your jewellery order is handed over to our courier partner (BlueDart / Delhivery / DTDC), you will receive:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>An official dispatch email containing your unique <strong>AWB / Tracking Number</strong> and direct tracking URL.</li>
              <li>SMS alerts at dispatch, out-for-delivery, and final delivery stages.</li>
              <li>You can also track your parcel anytime by visiting the courier tracking link or emailing our care team with your order number.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              4. Tamper-Proof Luxury Packaging & Unboxing
            </h2>
            <p>
              All Anayas jewellery pieces are packed in cushioned velvet/satin protective boxes, shrink-wrapped and enclosed in a tamper-evident outer envelope.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#FFF6EA] border border-[#EAD5BE] text-xs text-[#78716C] space-y-2">
              <p className="font-medium text-[#1C1917]">
                ⚠️ Important Advisory upon Delivery:
              </p>
              <p>
                If the outer courier bag appears visibly tampered with, cut, or damaged upon delivery, please <strong>refuse to accept the package</strong> and immediately inform us on WhatsApp at <a href="https://wa.me/919893020204" className="text-[#1C1917] font-semibold underline">+91 98930 20204</a>.
              </p>
              <p>
                We also kindly request customers to record a continuous, unedited video while unboxing the parcel for the rare event of transit damage or missing items.
              </p>
            </div>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              5. Queries & Logistics Support
            </h2>
            <p>
              If your parcel has not arrived within the estimated delivery window or you need to update an address before dispatch, contact our concierge:
            </p>
            <div className="mt-3 text-sm space-y-1 text-[#57534E]">
              <p>• <strong>Email:</strong> <a href="mailto:anayasjewels9@gmail.com" className="text-[#1C1917] underline font-medium">anayasjewels9@gmail.com</a> / <a href="mailto:anayasjewels9@gmail.com" className="text-[#1C1917] underline font-medium">anayasjewels9@gmail.com</a></p>
              <p>• <strong>WhatsApp / Call:</strong> <a href="tel:+919893020204" className="text-[#1C1917] underline font-medium">+91 98930 20204</a> (Mon–Sat, 10 AM – 7 PM IST)</p>
              <p>• <strong>Location:</strong> Indore, Madhya Pradesh, India</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

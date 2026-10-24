import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Scale, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms, conditions, purchase agreements, and legal guidelines governing your use of Anayas Jewels online store.",
  alternates: {
    canonical: "https://anayasjewels.com/terms",
  },
};

export default function TermsPage() {
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
          <span className="text-[#1C1917] font-medium">Terms & Conditions</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E6D5C3] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAD5BE]/50 border border-[#D8C2AA] text-[11px] uppercase tracking-widest text-[#1C1917] font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            Legal Agreement
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917]">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-2xl leading-relaxed">
            Welcome to Anayas Jewels. By accessing, browsing, or purchasing from anayasjewels.com, you agree to be bound by the following terms, conditions, and applicable Indian laws.
          </p>
          <p className="mt-2 text-xs text-[#A8A29E]">
            Effective Date: October 2026 • Governed by the laws of India.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-[#44403C]">
          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              1. Brand Identity & General Provisions
            </h2>
            <p>
              This website is operated by <strong>Anayas Jewels</strong> (&quot;Anayas&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). Throughout the site, the terms refer to our brand and commercial operations based in Indore, Madhya Pradesh, India.
            </p>
            <p className="mt-3">
              By visiting our site or purchasing our jewellery, you engage in our &quot;Service&quot; and agree to be bound by these Terms and Conditions, including our Privacy Policy and Shipping & Refund Policies.
            </p>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              2. Product Craftsmanship & Depictions
            </h2>
            <p>
              Anayas specializes in premium handcrafted imitation jewellery, including Kundan, Polki, Meenakari, and 18K gold-plated pieces:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>Because our pieces are handcrafted by seasoned artisans, minor natural variations in gemstone shade, texturing, or hand-painted Meenakari work are intrinsic hallmarks of artisanal craftsmanship rather than defects.</li>
              <li>We make every effort to display high-resolution, true-to-life studio images. However, individual display calibrations, screen brightness, and mobile color profiles may slightly alter perceived tones.</li>
              <li>Product availability and prices are subject to change without prior notice.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              3. Pricing, Currency & Orders
            </h2>
            <p>
              All prices listed on <strong>anayasjewels.com</strong> are denominated in <strong>Indian National Rupees (INR / ₹)</strong> and are inclusive of all applicable taxes:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>We reserve the right to refuse or cancel any order suspected of fraudulent activity, automated bot activity, or unauthorized payment attempts.</li>
              <li>If an item is mistakenly listed at an incorrect price, we reserve the right to decline or cancel the order and issue a 100% refund immediately.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              4. Payment Processing via Razorpay
            </h2>
            <p>
              Online payments are processed through RBI-authorized payment aggregator <strong>Razorpay</strong>:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>Supported payment modes: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards, Debit Cards, Net Banking, and digital wallets.</li>
              <li>You warrant that you are legally authorized to use the payment instrument provided at checkout.</li>
              <li>Orders are confirmed and queued for fulfillment only upon successful payment authorization from Razorpay and your issuing bank.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              5. Intellectual Property Rights
            </h2>
            <p>
              All content on this website—including photography, banners, text, logos, custom iconography, design elements, and product titles—is the exclusive intellectual property of Anayas Jewels and protected under copyright and trademark laws. Any unauthorized commercial copying, reproduction, or redistribution is strictly prohibited.
            </p>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              6. Limitation of Liability & Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the substantive laws of the Republic of India. Any legal dispute or proceeding arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Indore, Madhya Pradesh, India</strong>.
            </p>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              7. Contact Us
            </h2>
            <p className="text-sm text-[#57534E]">
              Questions regarding these Terms and Conditions should be directed to:
            </p>
            <div className="mt-3 text-sm space-y-1 text-[#57534E]">
              <p>• <strong>Brand:</strong> Anayas Jewels</p>
              <p>• <strong>Email:</strong> <a href="mailto:anayasjewels9@gmail.com" className="text-[#1C1917] underline font-medium">anayasjewels9@gmail.com</a></p>
              <p>• <strong>WhatsApp / Call:</strong> <a href="tel:+919893020204" className="text-[#1C1917] underline font-medium">+91 98930 20204</a></p>
              <p>• <strong>Operating Location:</strong> Indore, Madhya Pradesh, India</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

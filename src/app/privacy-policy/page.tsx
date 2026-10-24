import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Lock, Shield, Eye, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Anayas Jewels Privacy Policy explains how we protect, secure, and handle your personal and order data in compliance with Indian IT regulations.",
  alternates: {
    canonical: "https://anayasjewels.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[#1C1917] font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E6D5C3] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAD5BE]/50 border border-[#D8C2AA] text-[11px] uppercase tracking-widest text-[#1C1917] font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
            Data Protection & Security
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-2xl leading-relaxed">
            Your trust is our most treasured heirloom. This Privacy Policy details how Anayas collects, protects, and handles your information when you visit or shop on anayasjewels.com.
          </p>
          <p className="mt-2 text-xs text-[#A8A29E]">
            Last Updated: October 2026 • Effective immediately across all Anayas digital storefronts.
          </p>
        </div>

        {/* Key Security Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <Lock className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Zero Card Storage</h3>
            <p className="text-xs text-[#78716C] mt-1">
              All payment credentials are processed directly by RBI-licensed, PCI-DSS Level 1 Razorpay. We never store bank or card numbers.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <Eye className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">No Third-Party Sale</h3>
            <p className="text-xs text-[#78716C] mt-1">
              We never sell, rent, or lease your private contact info, address, or purchase history to marketing brokers.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/70 border border-[#E9E3DB] shadow-sm">
            <Database className="w-6 h-6 text-[#C5A059] mb-2" />
            <h3 className="font-serif text-base font-semibold text-[#1C1917]">Encrypted Storage</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Encrypted SSL communication throughout browse, cart, and checkout sessions.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-[#44403C]">
          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you purchase or browse on our site, we collect minimal information necessary to deliver your pieces safely:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li><strong>Contact Information:</strong> Full name, telephone/mobile number, and email address.</li>
              <li><strong>Shipping & Billing Details:</strong> Street address, city, state, and pin code for parcel delivery.</li>
              <li><strong>Order History:</strong> Pieces purchased, order numbers, amounts paid, and delivery status.</li>
              <li><strong>Technical Metadata:</strong> IP address, browser type, and device details for fraud prevention and performance optimization.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              Your data is utilized solely for lawful commercial and fulfillment purposes:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>Processing, verifying, and dispatching your jewellery orders.</li>
              <li>Delivering automated transactional emails (order confirmations, dispatch notices, tracking waybills).</li>
              <li>Customer care and inquiries via WhatsApp, email, or telephone.</li>
              <li>Fraud detection, payment risk analysis, and prevention of unauthorized transactions.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              3. Payment Security & Razorpay Integration
            </h2>
            <p>
              Anayas partners with <strong>Razorpay Software Private Limited</strong> for payment gateway processing. When you choose to pay via UPI, Credit Card, Debit Card, or Net Banking:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-[#57534E]">
              <li>Your card data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) encryption.</li>
              <li>All payment transactions are encrypted using end-to-end 256-bit SSL protocols.</li>
              <li>Anayas Jewels never sees, accesses, or records your credit/debit card number, CVV, or banking passwords.</li>
            </ul>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              4. Logistics Partners & Disclosure
            </h2>
            <p>
              We share your name, telephone, and shipping address only with verified third-party courier services (BlueDart Express, Delhivery, DTDC) exclusively to fulfill transit and doorstep delivery.
            </p>
          </section>

          <section className="bg-white/50 p-6 sm:p-8 rounded-2xl border border-[#E9E3DB]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mb-3">
              5. Your Rights & Data Grievance Officer
            </h2>
            <p>
              Under the Information Technology Act, 2000 and Rules thereunder, you have the right to request access to, correction of, or deletion of your personal data stored on our systems.
            </p>
            <p className="mt-2 text-sm text-[#57534E]">
              For any privacy-related queries or requests, please contact:
            </p>
            <div className="mt-3 text-sm space-y-1 text-[#57534E]">
              <p>• <strong>Grievance Contact:</strong> Anayas Customer Care</p>
              <p>• <strong>Email:</strong> <a href="mailto:anayasjewels9@gmail.com" className="text-[#1C1917] underline font-medium">anayasjewels9@gmail.com</a></p>
              <p>• <strong>Phone:</strong> <a href="tel:+919893020204" className="text-[#1C1917] underline font-medium">+91 98930 20204</a></p>
              <p>• <strong>Address:</strong> Indore, Madhya Pradesh, India</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

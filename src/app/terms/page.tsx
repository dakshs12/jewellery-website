import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Scale,
  Truck,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Ban,
  FileCheck,
} from "lucide-react";
import { legalDocument, legalQuickLinks } from "@/data/legalPolicies";

export const metadata: Metadata = {
  title: "Comprehensive Terms & Policies | Anayas Jewels",
  description:
    "Official terms and conditions, sale terms, shipping and delivery policy, final sale and no-return policy, jewellery care, and privacy policy for Anayas Jewels.",
  alternates: {
    canonical: "https://anayasjewels.com/terms",
  },
};

const quickLinkIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "#terms": Scale,
  "#cancellation": Ban,
  "#shipping": Truck,
  "#returns": RotateCcw,
  "#care": Sparkles,
  "#privacy": ShieldCheck,
  "#grievance": UserCheck,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6EA] text-[#1C1917] selection:bg-[#EAD5BE] selection:text-[#1C1917]">
      <Navbar />

      {/* Hero Header */}
      <section className="border-b border-[#E6D5C3] bg-gradient-to-b from-[#FAF4EB] to-[#FFF6EA] pt-10 sm:pt-14 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-[#78716C] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#1C1917] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1C1917] font-medium">Terms & Policies</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5BE]/60 border border-[#D8C2AA] text-[11px] uppercase tracking-[0.2em] text-[#1C1917] font-semibold mb-4">
              <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
              Official Legal Framework & Policies
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1917] tracking-tight leading-tight">
              Terms & Conditions, Sale, Shipping & Privacy Policy
            </h1>

            <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.15em] text-[#8C6D2B] font-medium">
              Anayas Jewels • Indore, Madhya Pradesh, India • Effective Date: November 2026
            </p>

            {/* Preamble Card */}
            <div className="mt-8 bg-white/70 border border-[#D8C2AA] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                <FileCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Preamble & Legal Governance</span>
              </div>
              {legalDocument.preamble.map((paragraph, idx) => (
                <p key={idx} className="text-[#3A3532]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Jump Pill Bar (Mobile & Tablet) */}
      <nav
        aria-label="Quick jump to sections"
        className="sticky top-20 sm:top-24 z-30 bg-[#FFF6EA]/95 backdrop-blur-md border-b border-[#E6D5C3] py-3 px-4 overflow-x-auto no-scrollbar lg:hidden shadow-sm"
      >
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#78716C] mr-1">
            Jump to:
          </span>
          {legalQuickLinks.map((item) => {
            const Icon = quickLinkIcons[item.href] || Scale;
            return (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#D8C2AA] bg-white/80 text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-all whitespace-nowrap active:scale-95"
              >
                <Icon className="w-3 h-3 text-[#C5A059]" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Desktop Left Sidebar: Sticky Table of Contents & Quick Navigation */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-32 space-y-6 max-h-[calc(100vh-9rem)] overflow-y-auto pr-3 scrollbar-thin">
              {/* Quick Navigation Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#E9E3DB] shadow-sm">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059] mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#C5A059]" />
                  <span>Key Policy Jump</span>
                </h3>
                <nav className="space-y-1.5">
                  {legalQuickLinks.map((item) => {
                    const Icon = quickLinkIcons[item.href] || Scale;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between py-2 px-3 rounded-xl text-xs font-medium text-[#44403C] hover:text-[#1C1917] hover:bg-[#F3E8DB] transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#C5A059] group-hover:scale-110 transition-transform" />
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#1C1917] group-hover:translate-x-0.5 transition-all" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* All Sections Index */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#E9E3DB] shadow-sm">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#78716C] mb-3">
                  Document Index (1–30)
                </h3>
                <nav className="space-y-1 max-h-72 overflow-y-auto pr-1 text-xs text-[#57534E]">
                  {legalDocument.sections.map((section) => (
                    <a
                      key={section.number}
                      href={section.id ? `#${section.id}` : `#section-${section.number}`}
                      className="block py-1 px-2 rounded-lg hover:bg-[#FAF4EB] hover:text-[#1C1917] truncate transition-colors"
                      title={`${section.number}. ${section.title}`}
                    >
                      <span className="font-semibold text-[#8C6D2B] mr-1.5">
                        {section.number}.
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Grievance Quick Card */}
              <div className="bg-[#FAF4EB] rounded-2xl p-5 border border-[#D8C2AA] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6D2B]">
                  <UserCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Contact Person</span>
                </div>
                <div className="text-xs text-[#57534E] space-y-1">
                  <p className="font-medium text-[#1C1917]">Mr. Sanil Sethi</p>
                  <p className="text-[#78716C]">Indore, Madhya Pradesh</p>
                </div>
                <div className="pt-2 space-y-1 text-xs">
                  <a
                    href="mailto:anayasjewels9@gmail.com"
                    className="flex items-center gap-1.5 text-[#1C1917] hover:text-[#C5A059] font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="truncate">anayasjewels9@gmail.com</span>
                  </a>
                  <a
                    href="tel:+919893020204"
                    className="flex items-center gap-1.5 text-[#1C1917] hover:text-[#C5A059] font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>+91 98930 20204</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Content Column */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {legalDocument.sections.map((section) => {
              const isCallout = section.callout;
              const sectionAnchor = section.id || `section-${section.number}`;

              return (
                <section
                  key={section.number}
                  id={sectionAnchor}
                  className={`scroll-mt-32 sm:scroll-mt-36 transition-all rounded-2xl p-6 sm:p-8 ${isCallout
                    ? "bg-[#FAF4EB] border-2 border-[#C5A059] shadow-[0_4px_24px_rgba(197,160,89,0.12)]"
                    : "bg-white/70 backdrop-blur-sm border border-[#E9E3DB] shadow-sm hover:border-[#D8C2AA]"
                    }`}
                >
                  {/* Callout Header Badge */}
                  {section.number === 10 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1917] text-[#FAF8F5] text-[11px] uppercase tracking-wider font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Critical Customer Notice • Final Sale Policy</span>
                    </div>
                  )}

                  {section.number === 24 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#1C1917] text-[11px] uppercase tracking-wider font-semibold">
                      <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Statutory Grievance Redressal Mechanism</span>
                    </div>
                  )}

                  {/* Section Title */}
                  <div className="flex items-baseline justify-between border-b border-[#EAD5BE] pb-4 mb-6">
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] tracking-tight">
                      <span className="text-[#8C6D2B] mr-2.5">
                        {section.number}.
                      </span>
                      {section.title}
                    </h2>
                    <a
                      href={`#${sectionAnchor}`}
                      className="text-xs text-[#A8A29E] hover:text-[#C5A059] transition-colors hidden sm:inline-block ml-4"
                      title="Anchor Link"
                    >
                      #
                    </a>
                  </div>

                  {/* Clauses */}
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#3A3532]">
                    {section.clauses.map((clause, cIdx) => (
                      <div key={cIdx} className="space-y-2">
                        {/* Clause Lead Text */}
                        <p>
                          {clause.number && (
                            <span className="font-semibold text-[#8C6D2B] mr-2">
                              {clause.number}
                            </span>
                          )}
                          {clause.text}
                        </p>

                        {/* Bullets (e.g. a, b, c) */}
                        {clause.bullets && clause.bullets.length > 0 && (
                          <div className="mt-2.5 pl-4 sm:pl-6 border-l-2 border-[#EAD5BE] space-y-2 text-[#44403C]">
                            {clause.bullets.map((bullet, bIdx) => (
                              <p key={bIdx} className="text-sm sm:text-base">
                                {bullet}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Structured Contact Details (Section 24 or 17.15) */}
                        {clause.contact && clause.contact.length > 0 && (
                          <div className="mt-4 bg-white/90 border border-[#D8C2AA] rounded-xl p-4 sm:p-5 space-y-2.5 max-w-lg shadow-sm">
                            {clause.contact.map((cItem, ctIdx) => (
                              <div
                                key={ctIdx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1 sm:gap-4 py-1 border-b border-[#F3E8DB] last:border-0"
                              >
                                <span className="font-semibold text-[#78716C]">
                                  {cItem.label}:
                                </span>
                                {cItem.href ? (
                                  <a
                                    href={cItem.href}
                                    className="font-medium text-[#1C1917] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                                  >
                                    <span>{cItem.value}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                                  </a>
                                ) : (
                                  <span className="font-medium text-[#1C1917]">
                                    {cItem.value}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

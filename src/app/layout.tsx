import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import AgentationDev from "@/components/dev/AgentationDev";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFF6EA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anayasjewels.com"),
  title: {
    default: "Anayas Imitation Jewellery",
    template: "%s | Anayas Jewels",
  },
  description:
    "Discover handcrafted Kundan, Polki, Meenakari, and heirloom imitation jewellery designed for weddings, festivities, and timeless everyday elegance.",
  alternates: {
    canonical: "https://anayasjewels.com",
  },
  keywords: [
    "imitation jewellery",
    "polki choker",
    "kundan earrings",
    "bridal jewellery set",
    "gold plated bangles",
    "Anayas jewellery",
    "handcrafted Indian jewellery",
    "Anayas Jewels",
  ],
  icons: {
    icon: [
      { url: "/6.svg", type: "image/svg+xml" },
      { url: "/6.png", type: "image/png" },
    ],
    shortcut: "/6.png",
    apple: "/6.png",
  },
  openGraph: {
    title: "Anayas Imitation Jewellery",
    description:
      "Curated heirloom craftsmanship with modern silhouettes. Handcrafted Polki, Kundan, and artisanal collections.",
    url: "https://anayasjewels.com",
    siteName: "Anayas Jewels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/anayas.png",
        width: 1280,
        height: 650,
        alt: "Anayas Jewels — Artisanal Imitation Jewellery & Royal Heirlooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anayas Imitation Jewellery",
    description:
      "Curated heirloom craftsmanship with modern silhouettes. Handcrafted Polki, Kundan, and artisanal collections.",
    images: ["/anayas.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": "https://anayasjewels.com/#store",
      "name": "Anayas Jewels",
      "alternateName": "Anayas Luxury Jewellery",
      "url": "https://anayasjewels.com",
      "logo": "https://anayasjewels.com/anayas.png",
      "image": "https://anayasjewels.com/anayas.png",
      "description":
        "Artisanal imitation jewellery bridging ancestral royal Indian techniques with contemporary silhouettes. Handcrafted Kundan, Polki, everyday anti-tarnish, and heirloom bridal jewellery.",
      "telephone": "+919893151951",
      "email": "anayasjewels9@gmail.com",
      "priceRange": "₹300 - ₹7500",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN",
      },
      "sameAs": ["https://www.instagram.com/_anayasjewels/"],
      "areaServed": {
        "@type": "Country",
        "name": "India",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://anayasjewels.com/#website",
      "url": "https://anayasjewels.com",
      "name": "Anayas Jewels",
      "publisher": {
        "@id": "https://anayasjewels.com/#store",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate":
            "https://anayasjewels.com/products?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HB351GXWCR";

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FFF6EA] text-[#1C1917] font-sans flex flex-col selection:bg-[#E8D7D0] selection:text-[#1C1917]">
        {/* Schema.org Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics (gtag.js) */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {children}
        <AgentationDev />
      </body>
    </html>
  );
}

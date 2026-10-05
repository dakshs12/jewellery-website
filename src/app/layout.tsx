import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Anayas — Artisanal Imitation Jewellery & Royal Heirlooms",
  description:
    "Discover handcrafted Kundan, Polki, Meenakari, and 18K gold-plated heirloom imitation jewellery designed for weddings, festivities, and timeless everyday elegance.",
  keywords: [
    "imitation jewellery",
    "polki choker",
    "kundan earrings",
    "bridal jewellery set",
    "gold plated bangles",
    "Anayas jewellery",
    "handcrafted Indian jewellery",
  ],
  openGraph: {
    title: "Anayas — Artisanal Imitation Jewellery & Royal Heirlooms",
    description:
      "Curated heirloom craftsmanship with modern silhouettes. Handcrafted Polki, Kundan, and 18K gold-plated artisanal collections.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans flex flex-col selection:bg-[#E8D7D0] selection:text-[#1C1917]">
        {children}
        <AgentationDev />
      </body>
    </html>
  );
}

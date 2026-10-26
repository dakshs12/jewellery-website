import type { Metadata, Viewport } from "next";
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
    default: "Anayas — Artisanal Imitation Jewellery & Royal Heirlooms",
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
      { url: "/5.svg", type: "image/svg+xml" },
    ],
    shortcut: "/5.svg",
    apple: "/5.svg",
  },
  openGraph: {
    title: "Anayas — Artisanal Imitation Jewellery & Royal Heirlooms",
    description:
      "Curated heirloom craftsmanship with modern silhouettes. Handcrafted Polki, Kundan, and artisanal collections.",
    url: "https://anayasjewels.com",
    siteName: "Anayas Jewels",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anayas — Artisanal Imitation Jewellery & Royal Heirlooms",
    description:
      "Curated heirloom craftsmanship with modern silhouettes. Handcrafted Polki, Kundan, and artisanal collections.",
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
      className={`${cormorant.variable} ${plusJakarta.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FFF6EA] text-[#1C1917] font-sans flex flex-col selection:bg-[#E8D7D0] selection:text-[#1C1917]">
        {children}
        <AgentationDev />
      </body>
    </html>
  );
}

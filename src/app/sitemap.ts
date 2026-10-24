import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://anayasjewels.com";
  const lastModified = new Date();

  const categories = [
    "Necklace",
    "Pendant Sets",
    "Everyday Wear",
    "Earrings",
    "Rings",
    "Bracelets",
    "Mangalsutra",
  ];

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(cat)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryRoutes,
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}

import { groq } from "next-sanity";
import { client, isSanityConfigured } from "./client";
import { urlForImage } from "./image";
import { Product, ProductCategory } from "@/types/database";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    sale_price,
    inStock,
    isBestseller,
    badge,
    isNew,
    category,
    description,
    images[] {
      ...,
      asset->
    },
    externalImages,
    specifications
  }
`;

export const BESTSELLERS_QUERY = groq`
  *[_type == "product" && isBestseller == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    sale_price,
    inStock,
    isBestseller,
    badge,
    isNew,
    category,
    description,
    images[] {
      ...,
      asset->
    },
    externalImages,
    specifications
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && (category == $category || category == $categoryAlt)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    sale_price,
    inStock,
    isBestseller,
    badge,
    isNew,
    category,
    description,
    images[] {
      ...,
      asset->
    },
    externalImages,
    specifications
  }
`;

// Helper to normalize raw Sanity documents to the TypeScript Product interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSanityProduct(doc: any): Product {
  // Resolve image URLs from Sanity upload or external pre-compressed studio paths
  const resolvedImages: string[] = [];

  if (Array.isArray(doc.images) && doc.images.length > 0) {
    for (const img of doc.images) {
      const url = urlForImage(img);
      if (url) resolvedImages.push(url);
    }
  }

  if (Array.isArray(doc.externalImages) && doc.externalImages.length > 0) {
    for (const ext of doc.externalImages) {
      if (typeof ext === "string" && !resolvedImages.includes(ext)) {
        resolvedImages.push(ext);
      }
    }
  }

  // Fallback placeholder image if none defined
  if (resolvedImages.length === 0) {
    resolvedImages.push("/products/necklace/necklace-01.jpg");
  }

  // Normalize category name (e.g. "Necklaces" -> "Necklace")
  let cat = (doc.category || "Necklace") as ProductCategory;
  if ((cat as string) === "Necklaces") cat = "Necklace";

  return {
    id: doc._id || crypto.randomUUID(),
    title: doc.title || "Royal Heirloom Jewellery",
    slug: typeof doc.slug === "object" ? doc.slug?.current : doc.slug || "jewellery-piece",
    price: Number(doc.price) || 0,
    sale_price: doc.sale_price ? Number(doc.sale_price) : undefined,
    in_stock: doc.inStock ?? doc.in_stock ?? true,
    is_bestseller: doc.isBestseller ?? doc.is_bestseller ?? false,
    category: cat,
    description: doc.description || "",
    images: resolvedImages,
    specifications: {
      material: doc.specifications?.material || "High-grade Brass Core Alloy",
      plating: doc.specifications?.plating || "22K Micron Gold Plated",
      stones: doc.specifications?.stones || "Handcrafted Polki & Cultured Pearls",
      weight: doc.specifications?.weight || undefined,
      closure: doc.specifications?.closure || undefined,
    },
  };
}

/**
 * Fetch all products with graceful zero-crash fallback to mockProducts.ts
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = await client.fetch(ALL_PRODUCTS_QUERY, {}, { next: { revalidate: 30 } });
    if (!raw || raw.length === 0) {
      return MOCK_PRODUCTS;
    }
    return raw.map(mapSanityProduct);
  } catch (error) {
    console.warn("[Sanity getProducts] Falling back to mockProducts:", error);
    return MOCK_PRODUCTS;
  }
}

/**
 * Fetch bestseller products with fallback
 */
export async function getBestsellerProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS.filter((p) => p.is_bestseller);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = await client.fetch(BESTSELLERS_QUERY, {}, { next: { revalidate: 30 } });
    if (!raw || raw.length === 0) {
      return MOCK_PRODUCTS.filter((p) => p.is_bestseller);
    }
    return raw.map(mapSanityProduct);
  } catch (error) {
    console.warn("[Sanity getBestsellerProducts] Falling back to mockProducts:", error);
    return MOCK_PRODUCTS.filter((p) => p.is_bestseller);
  }
}

/**
 * Fetch products by category with fallback
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = await client.fetch(
      PRODUCTS_BY_CATEGORY_QUERY,
      {
        category,
        categoryAlt: category.endsWith("s") ? category.slice(0, -1) : `${category}s`,
      },
      { next: { revalidate: 30 } }
    );
    if (!raw || raw.length === 0) {
      return MOCK_PRODUCTS.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    return raw.map(mapSanityProduct);
  } catch (error) {
    console.warn("[Sanity getProductsByCategory] Falling back to mockProducts:", error);
    return MOCK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
}

export const WEBSITE_PHOTOS_QUERY = groq`
  *[_type == "websitePhotos"][0] {
    heroImage {
      ...,
      asset->
    },
    heroImageAlt,
    heroBadgeText,
    heroTitleText,
    categoryNecklaceImage {
      ...,
      asset->
    },
    categoryPendantSetsImage {
      ...,
      asset->
    },
    categoryEverydayWearImage {
      ...,
      asset->
    },
    categoryEarringsImage {
      ...,
      asset->
    },
    categoryRingsImage {
      ...,
      asset->
    },
    categoryBraceletsImage {
      ...,
      asset->
    },
    categoryMangalsutraImage {
      ...,
      asset->
    }
  }
`;

export interface WebsitePhotosData {
  heroImage?: string;
  heroImageAlt?: string;
  heroBadgeText?: string;
  heroTitleText?: string;
  categoryImages: Record<string, string | undefined>;
}

/**
 * Fetch published Website Photos & Banners with graceful fallback
 */
export async function getWebsitePhotos(): Promise<WebsitePhotosData | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await client.fetch(
      WEBSITE_PHOTOS_QUERY,
      {},
      { next: { revalidate: 30 } }
    );
    if (!raw) return null;

    const heroUrl = raw.heroImage ? urlForImage(raw.heroImage) : undefined;
    const necklaceUrl = raw.categoryNecklaceImage
      ? urlForImage(raw.categoryNecklaceImage)
      : undefined;
    const pendantSetsUrl = raw.categoryPendantSetsImage
      ? urlForImage(raw.categoryPendantSetsImage)
      : undefined;
    const everydayWearUrl = raw.categoryEverydayWearImage
      ? urlForImage(raw.categoryEverydayWearImage)
      : undefined;
    const earringsUrl = raw.categoryEarringsImage
      ? urlForImage(raw.categoryEarringsImage)
      : undefined;
    const ringsUrl = raw.categoryRingsImage
      ? urlForImage(raw.categoryRingsImage)
      : undefined;
    const braceletsUrl = raw.categoryBraceletsImage
      ? urlForImage(raw.categoryBraceletsImage)
      : undefined;
    const mangalsutraUrl = raw.categoryMangalsutraImage
      ? urlForImage(raw.categoryMangalsutraImage)
      : undefined;

    return {
      heroImage: heroUrl || undefined,
      heroImageAlt: raw.heroImageAlt || undefined,
      heroBadgeText: raw.heroBadgeText || undefined,
      heroTitleText: raw.heroTitleText || undefined,
      categoryImages: {
        necklace: necklaceUrl,
        "pendant-sets": pendantSetsUrl,
        pendantSets: pendantSetsUrl,
        "everyday-wear": everydayWearUrl,
        everydayWear: everydayWearUrl,
        earrings: earringsUrl,
        rings: ringsUrl,
        bracelets: braceletsUrl,
        mangalsutra: mangalsutraUrl,
      },
    };
  } catch (error) {
    console.warn("[Sanity getWebsitePhotos] Falling back to default assets:", error);
    return null;
  }
}


import { NextResponse } from "next/server";
import { writeClient, projectId } from "@/lib/sanity/client";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}

async function handleSeed() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || projectId === "dummy_project_id") {
    return NextResponse.json(
      {
        success: false,
        error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables.",
        instructions:
          "Please configure NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file to seed products into your Sanity dataset.",
      },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing SANITY_API_WRITE_TOKEN in environment variables.",
        instructions:
          "Please generate an API Token with 'Editor' or 'Administrator' rights from your Sanity Management Console (https://sanity.io/manage) and add SANITY_API_WRITE_TOKEN to .env.local.",
      },
      { status: 400 }
    );
  }

  try {
    const results = [];

    for (const product of MOCK_PRODUCTS) {
      const doc = {
        _id: `product-${product.slug}`,
        _type: "product",
        title: product.title,
        slug: {
          _type: "slug",
          current: product.slug,
        },
        price: product.price,
        sale_price: product.sale_price ?? undefined,
        inStock: product.in_stock ?? true,
        isBestseller: product.is_bestseller ?? false,
        badge: product.is_bestseller ? "Bestseller" : undefined,
        isNew: false,
        category: product.category,
        description: product.description,
        externalImages: product.images,
        specifications: {
          material: product.specifications.material,
          plating: product.specifications.plating,
          stones: product.specifications.stones,
          weight: product.specifications.weight || "",
          closure: product.specifications.closure || "",
        },
      };

      const res = await writeClient.createOrReplace(doc);
      results.push({ id: res._id, title: product.title });
    }

    return NextResponse.json({
      success: true,
      seededCount: results.length,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      message: `Successfully seeded ${results.length} products with studio photography into Sanity CMS.`,
      products: results,
    });
  } catch (error: unknown) {
    console.error("[Sanity Seed Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to seed products into Sanity",
      },
      { status: 500 }
    );
  }
}

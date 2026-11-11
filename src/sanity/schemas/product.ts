import { defineType, defineField } from "sanity";
import { ProductFormInput } from "../components/ProductFormInput";

export const product = defineType({
  name: "product",
  title: "Jewellery Products",
  type: "document",
  components: {
    input: ProductFormInput,
  },
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Product title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug / URL Identifier",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required for product routing"),
    }),
    defineField({
      name: "price",
      title: "Base Price (₹)",
      type: "number",
      description: "Standard retail price in INR",
      validation: (Rule) => Rule.required().positive().error("Price must be a positive number"),
    }),
    defineField({
      name: "sale_price",
      title: "Sale / Discounted Price (₹)",
      type: "number",
      description: "Optional promotional price. If set, will show a discount percentage badge.",
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
      description:
        "Toggle OFF to mark as 'Out of Stock' and disable purchasing. Automatically turns OFF when Available Stock Quantity reaches 0.",
    }),
    defineField({
      name: "stockQuantity",
      title: "Available Stock Quantity",
      type: "number",
      initialValue: 1,
      description:
        "Enter how many pieces you have in stock (e.g. 1, 2, 3). Customers cannot add more than this to their bag. Automatically decreases after each paid order and marks the product Out of Stock at 0.",
      hidden: ({ document }) => document?.inStock === false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { inStock?: boolean } | undefined;
          if (value === undefined || value === null) return true;
          if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
            return "Stock quantity must be a whole number (0 or greater).";
          }
          if (doc?.inStock !== false && value === 0) {
            return "Stock quantity is 0 while 'In Stock' is ON. Enter at least 1 or toggle 'In Stock' OFF.";
          }
          return true;
        }),
    }),
    defineField({
      name: "isBestseller",
      title: "Mark as Bestseller",
      type: "boolean",
      initialValue: false,
      description: "Showcases this piece in featured sections and highlights with a Bestseller badge.",
    }),
    defineField({
      name: "badge",
      title: "Custom Badge Text (Optional)",
      type: "string",
      description: "e.g., 'Royal Heritage', 'Bridal Exclusive', 'Anti-Tarnish'",
    }),
    defineField({
      name: "isNew",
      title: "New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Collection Category",
      type: "string",
      options: {
        list: [
          { title: "Necklace (Chokers, Malas & Rani Haars)", value: "Necklace" },
          { title: "Pendant Sets", value: "Pendant Sets" },
          { title: "Earrings (Chandbalis, Jhumkas & Studs)", value: "Earrings" },
          { title: "Bracelets & Kadas", value: "Bracelets" },
          { title: "Everyday Wear (Anti-Tarnish Minimalist)", value: "Everyday Wear" },
          { title: "Rings (Cocktail Statements & Bands)", value: "Rings" },
          { title: "Mangalsutra (Sacred Heirlooms)", value: "Mangalsutra" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "description",
      title: "Editorial Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Uploaded Photos (Sanity CDN)",
      type: "array",
      description: "High-resolution uploaded photos. Hotspot enabled for responsive cropping.",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Important for accessibility and SEO.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "externalImages",
      title: "Local / Studio Image Paths",
      type: "array",
      description: "Pre-optimized local image paths (e.g. /products/necklace/necklace-01.jpg). Used for initial seed & local asset serving.",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      price: "price",
      sale_price: "sale_price",
      inStock: "inStock",
      stockQuantity: "stockQuantity",
      media: "images.0",
    },
    prepare({ title, subtitle, price, sale_price, inStock, stockQuantity, media }) {
      const hasQty = typeof stockQuantity === "number";
      const isSoldOut = inStock === false || (hasQty && stockQuantity <= 0);
      const stockStatus = isSoldOut
        ? " [OUT OF STOCK]"
        : hasQty
          ? ` [Qty: ${stockQuantity}]`
          : "";
      const priceText = sale_price
        ? `₹${sale_price} (MSRP ₹${price ?? "-"})`
        : price !== undefined
          ? `₹${price}`
          : "Price not set";
      return {
        title: `${title || "Untitled Product"}${stockStatus}`,
        subtitle: `${subtitle || "Uncategorized"} • ${priceText}`,
        media,
      };
    },
  },
});

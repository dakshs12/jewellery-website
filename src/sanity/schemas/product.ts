import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Jewellery Products",
  type: "document",
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
      description: "Toggle OFF to mark as 'Out of Stock' and disable purchasing.",
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
      media: "images.0",
    },
    prepare({ title, subtitle, price, sale_price, inStock, media }) {
      const stockStatus = inStock === false ? " [OUT OF STOCK]" : "";
      const priceText = sale_price ? `₹${sale_price} (MSRP ₹${price})` : `₹${price}`;
      return {
        title: `${title}${stockStatus}`,
        subtitle: `${subtitle} • ${priceText}`,
        media,
      };
    },
  },
});

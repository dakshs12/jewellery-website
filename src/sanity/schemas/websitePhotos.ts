import { defineType, defineField } from "sanity";
import { WebsitePhotosBanner } from "../components/WebsitePhotosBanner";

export const websitePhotos = defineType({
  name: "websitePhotos",
  title: "Website Photos",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "1. Hero Section Photo",
      default: true,
    },
    {
      name: "categories",
      title: "2. Category Photos (7 Collections)",
    },
    {
      name: "guidelines",
      title: "3. Instructions & Publishing Guide",
    },
  ],
  fields: [
    // --- TOP INSTRUCTIONAL BANNER ---
    defineField({
      name: "bannerNotice",
      title: "Publishing Instructions",
      type: "string",
      components: {
        input: WebsitePhotosBanner,
      },
      readOnly: true,
      hidden: false,
    }),

    // --- 1. HERO SECTION PHOTO ---
    defineField({
      name: "heroImage",
      title: "Hero Section Showcase Photo",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1200 × 1600 px (3:4 aspect ratio portrait). Minimum width: 900 px. File size: Under 2MB. Appears as the primary luxury portrait on the right side of the homepage hero banner.",
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Photo Description (Alt Text for SEO)",
      type: "string",
      group: "hero",
      description:
        "Short descriptive text for search engines and accessibility (e.g. 'Royal Rajasthani Kundan Choker Bridal Collection').",
      initialValue: "Royal Anayas Artisanal Bridal Collection",
    }),
    defineField({
      name: "heroBadgeText",
      title: "Hero Photo Overlay Badge Tag",
      type: "string",
      group: "hero",
      description:
        "Small gold badge tag displayed over the photo bottom corner (e.g. 'Imperial Edition' or 'New Festive 2026').",
      initialValue: "Imperial Edition",
    }),
    defineField({
      name: "heroTitleText",
      title: "Hero Photo Overlay Title",
      type: "string",
      group: "hero",
      description:
        "Title displayed over the photo bottom corner (e.g. 'The Gulmohar Crystal' or 'The Royal Nizam Choker').",
      initialValue: "The Gulmohar Crystal",
    }),

    // --- 2. CATEGORY COLLECTION PHOTOS ---
    defineField({
      name: "categoryNecklaceImage",
      title: "1. Necklace Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Chokers, Malas & Rani Haars'. Displayed on Homepage 'Our Collection' grid (Tier 1 pillar card) and category pages.",
    }),
    defineField({
      name: "categoryPendantSetsImage",
      title: "2. Pendant Sets Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Intricate Kundan & Gemstone Sets'. Displayed on Homepage 'Our Collection' grid (Tier 2 card) and category pages.",
    }),
    defineField({
      name: "categoryEverydayWearImage",
      title: "3. Everyday Wear Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Anti-Tarnish Minimalist Luxury'. Displayed on Homepage 'Our Collection' grid (Tier 2 card) and category pages.",
    }),
    defineField({
      name: "categoryEarringsImage",
      title: "4. Earrings Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Chandbalis, Jhumkas & Studs'. Displayed on Homepage 'Our Collection' grid (Tier 1 pillar card) and category pages.",
    }),
    defineField({
      name: "categoryRingsImage",
      title: "5. Rings Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Cocktail Statements & Bands'. Displayed on Homepage 'Our Collection' grid (Tier 1 pillar card) and category pages.",
    }),
    defineField({
      name: "categoryBraceletsImage",
      title: "6. Bracelets Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Artisanal Kadas & Tennis Chains'. Displayed on Homepage 'Our Collection' grid (Tier 2 card) and category pages.",
    }),
    defineField({
      name: "categoryMangalsutraImage",
      title: "7. Mangalsutra Photo",
      type: "image",
      group: "categories",
      options: {
        hotspot: true,
      },
      description:
        "📐 RECOMMENDED: 1000 × 1400 px (5:7 / 3:4 portrait). Subtitle: 'Sacred & Contemporary Heirlooms'. Displayed on Homepage 'Our Collection' grid (Tier 2 card) and category pages.",
    }),

    // --- 3. GUIDELINES & CONFIRMATION INSTRUCTIONS ---
    defineField({
      name: "publishingGuidelines",
      title: "Publishing & Safety Notes",
      type: "text",
      group: "guidelines",
      readOnly: true,
      initialValue:
        "HOW PUBLISHING WORKS:\n1. Upload or change any photo in the 'Hero Section Photo' or 'Category Photos' tabs.\n2. Sanity will save your work automatically as a private DRAFT.\n3. The image is NOT LIVE on your website yet.\n4. When you are ready and happy with your changes, click the green 'Publish' button at the bottom right corner of your screen.\n5. To undo or revert your uploaded changes before publishing, open the menu next to the Publish button and select 'Discard changes'.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Website Photos",
        subtitle: "Hero Banner & 7 Category Showcase Media",
      };
    },
  },
});

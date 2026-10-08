import { Product } from "@/types/database";

export const MOCK_PRODUCTS: Product[] = [
  // 1. Necklace
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Noor Mahal Polki & Freshwater Pearl Choker",
    slug: "noor-mahal-polki-freshwater-pearl-choker",
    price: 6899,
    sale_price: 5499,
    in_stock: true,
    is_bestseller: true,
    category: "Necklace",
    description:
      "Handcrafted with precision-cut un-cut Polki stones set in an antique gold micron-plated base, delicately finished with cascading clusters of cultured freshwater rice pearls and hand-enameled reverse Meenakari motif.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "High-grade Brass & Copper Alloy",
      plating: "22K Antique Micron Gold Plating with Anti-Tarnish Coat",
      stones: "Uncut Glass Polki, Cultured Freshwater Pearls",
      weight: "115 grams",
      closure: "Handmade adjustable Dori (Tassel cord)",
    },
  },
  {
    id: "e51f643f-9200-4716-e901-4c46f6a7b813",
    title: "Rani Haar Vintage Layered Pearl Mala",
    slug: "rani-haar-vintage-layered-pearl-mala",
    price: 7499,
    sale_price: 6499,
    in_stock: true,
    is_bestseller: false,
    category: "Necklace",
    description:
      "Five harmonious strands of micro-pearls anchored by an intricate Jadau pendant studded with cabochon ruby stimulants and fine uncut stones.",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Brass Core with Micro-Enameling",
      plating: "22K Micron Gold Finish",
      stones: "Cultured Pearl Strands, Synthetic Rubies, Kundan Inlay",
      weight: "92 grams",
      closure: "Adjustable Silk Cord",
    },
  },

  // 2. Pendant Sets
  {
    id: "d40e532e-81ff-4605-d890-3b35e5f6a702",
    title: "Mehrunissa Kundan & Emerald Teardrop Pendant Set",
    slug: "mehrunissa-kundan-emerald-teardrop-pendant-set",
    price: 4999,
    sale_price: 3999,
    in_stock: true,
    is_bestseller: true,
    category: "Pendant Sets",
    description:
      "A delicate royal teardrop pendant showcasing open-claw Kundan inlay surrounded by halo micro-pearls and a carved Zambian-hue emerald drop, paired with matching drop studs.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Solid Brass Alloy Base",
      plating: "18K Matte Royal Gold Plating",
      stones: "Fine Kundan, Hydro Emerald Drop, Seed Pearls",
      weight: "42 grams (set)",
      closure: "Delicate 18-inch Gold Chain with Lobster Clasp",
    },
  },

  // 3. Everyday Wear
  {
    id: "g73a9852-1543-4150-2d45-8f89d0e1f257",
    title: "Aethel Minimalist 18K Anti-Tarnish Snake Chain",
    slug: "aethel-minimalist-18k-anti-tarnish-snake-chain",
    price: 1999,
    sale_price: 1599,
    in_stock: true,
    is_bestseller: false,
    category: "Everyday Wear",
    description:
      "A fluid, featherweight herringbone flat snake chain dipped in thick 18K yellow gold PVD vacuum coating. Sweat-proof, perfume-proof, and designed for effortless daily layering.",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "316L Surgical Grade Stainless Steel Core",
      plating: "18K Real Gold PVD Vacuum Plated (Lifetime Color Seal)",
      stones: "None (Polished Liquid Metal)",
      weight: "14 grams",
      closure: "Reinforced Lobster Lock with 2-inch Extender",
    },
  },

  // 4. Earrings
  {
    id: "b28c310c-69dd-4483-b678-1f13c3d4e580",
    title: "Chandrika Royal Kundan & Mint Meena Chandbalis",
    slug: "chandrika-royal-kundan-mint-meena-chandbalis",
    price: 3499,
    sale_price: 2999,
    in_stock: true,
    is_bestseller: true,
    category: "Earrings",
    description:
      "Crescent-shaped statement earrings featuring Jadau Kundan artistry, soft mint-green Meenakari work on reverse, and finished with delicate pearl piroi and tourmaline-hued micro drops.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Hypoallergenic Artisan Brass",
      plating: "18K Yellow Gold Dip",
      stones: "Hand-set Kundan Stones, Hydro Mint Beads, Seed Pearls",
      weight: "48 grams (pair)",
      closure: "Push back with comfort pad",
    },
  },
  {
    id: "f6207540-0311-4827-fa12-5d57a7b8c924",
    title: "Gulab Meena Jhumkas with Seed Pearl Fringe",
    slug: "gulab-meena-jhumkas-seed-pearl-fringe",
    price: 2899,
    in_stock: true,
    is_bestseller: false,
    category: "Earrings",
    description:
      "Artisan-crafted dome jhumkas celebrating traditional Jaipur pink gulabi Meenakari with floating seed-pearl ghungroo bells.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Fine Artisan Copper Alloy",
      plating: "Antique Champagne Gold Electroplating",
      stones: "Hand-painted Gulabi Meena, Glass Polki, Seed Pearls",
      weight: "36 grams (pair)",
      closure: "Silver-needle post with butterfly clutch",
    },
  },

  // 5. Rings
  {
    id: "h84b0963-2654-4261-3e56-9a90e1f2a368",
    title: "Padmavati Oversized Jadau Statement Cocktail Ring",
    slug: "padmavati-oversized-jadau-statement-cocktail-ring",
    price: 2499,
    sale_price: 1999,
    in_stock: true,
    is_bestseller: true,
    category: "Rings",
    description:
      "A grand royal court motif featuring a center Polki mirror surrounded by floral petal Kundan inlays and delicate enameling. Designed with a flexible interior band for customizable sizing.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Eco-brass alloy with hand-burnished edges",
      plating: "22K Antique Micron Gold Dip",
      stones: "Faceted Glass Polki & Synthetic Ruby Center",
      weight: "22 grams",
      closure: "Free-size adjustable shank",
    },
  },

  // 6. Bracelets
  {
    id: "c39d421d-70ee-4594-c789-2a24d4e5f691",
    title: "Aura Fluted 18K Gold Plated Kada Pair",
    slug: "aura-fluted-18k-gold-plated-kada-pair",
    price: 4299,
    in_stock: true,
    is_bestseller: false,
    category: "Bracelets",
    description:
      "Minimalist yet commanding fluted silhouette handcrafted for modern festive layering. Features a dual-hinged concealed clasp mechanism with mirror polish finish.",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Solid Brass Alloy Core",
      plating: "18K Satin-Gold Micron Plating (Double Lacquered)",
      stones: "None (Sculptural Fluted Metal)",
      weight: "62 grams (pair)",
      closure: "Concealed Side Hinge with Secure Screw Lock",
    },
  },
  {
    id: "a7318651-1422-4938-0b23-6e68b8c9d035",
    title: "Devi Temple Carved Ruby Bangles (Set of 4)",
    slug: "devi-temple-carved-ruby-bangles-set-of-4",
    price: 5999,
    sale_price: 4999,
    in_stock: true,
    is_bestseller: true,
    category: "Bracelets",
    description:
      "Inspired by ancient Dravidian temple architecture, these four antique matte gold bangles feature delicately carved Laxmi and peacock motifs accented with ruby-hued stones.",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Eco-brass alloy",
      plating: "South Indian Antique Temple Matte Gold",
      stones: "Potash Glass Ruby Cabochons",
      weight: "110 grams (set of 4)",
      closure: "Slip-on (Available in standard 2.4, 2.6, 2.8)",
    },
  },

  // 7. Mangalsutra
  {
    id: "j95c1074-3765-4372-4f67-0b01f2a3b479",
    title: "Swarna Rekha Modern Solitaire Polki Mangalsutra",
    slug: "swarna-rekha-modern-solitaire-polki-mangalsutra",
    price: 3299,
    sale_price: 2799,
    in_stock: true,
    is_bestseller: true,
    category: "Mangalsutra",
    description:
      "Contemporary sacred design uniting auspicious double-strand micro black spinels with a handcrafted teardrop Polki solitaire pendant set in antique 22K yellow gold.",
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    ],
    specifications: {
      material: "Hypoallergenic Artisan Brass & Silver",
      plating: "22K Antique Micron Gold Plating with Anti-Tarnish Seal",
      stones: "Natural Black Spinels, AAA+ Cut Glass Polki Solitaire",
      weight: "18 grams",
      closure: "16-inch length with 2-inch adjustable extension chain",
    },
  },
];

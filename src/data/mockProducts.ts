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
      "/products/necklace/necklace-01.jpg",
      "/products/necklace/necklace-02.jpg",
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
      "/products/necklace/necklace-03.jpg",
      "/products/necklace/necklace-04.jpg",
    ],
    specifications: {
      material: "Brass Core with Micro-Enameling",
      plating: "22K Micron Gold Finish",
      stones: "Cultured Pearl Strands, Synthetic Rubies, Kundan Inlay",
      weight: "92 grams",
      closure: "Adjustable Silk Cord",
    },
  },
  {
    id: "a12b345c-6789-4def-0123-456789abcdef",
    title: "Imperial Jadau Emerald & Pearl Bridal Choker Set",
    slug: "imperial-jadau-emerald-pearl-bridal-choker-set",
    price: 8999,
    sale_price: 7499,
    in_stock: true,
    is_bestseller: true,
    category: "Necklace",
    description:
      "Royal Rajasthani heritage bridal necklace set with deep green emerald hydro drops, handcrafted Polki arrangements, and matching chandelier earrings.",
    images: [
      "/products/necklace/necklace-05.jpg",
      "/products/necklace/necklace-06.jpg",
    ],
    specifications: {
      material: "Pure Brass Core Alloy",
      plating: "24K Royal Temple Gold Micro-Plated",
      stones: "Hydro Zambian Emeralds, Basra-Style Pearls, Uncut Polki",
      weight: "135 grams (complete set)",
      closure: "Adjustable Zari Dori Tassel",
    },
  },
  {
    id: "b77c889d-1122-4455-8899-aabbccddeeff",
    title: "Virasat Royal Hasli & Basra Pearl Collar",
    slug: "virasat-royal-hasli-basra-pearl-collar",
    price: 7999,
    sale_price: 6799,
    in_stock: true,
    is_bestseller: true,
    category: "Necklace",
    description:
      "A rigid royal Hasli silhouette sculpted in brass, adorned with intricate flower motif Polki setting and cascading lines of Basra-style micro pearls.",
    images: [
      "/products/necklace/necklace-07.jpg",
      "/products/necklace/necklace-08.jpg",
    ],
    specifications: {
      material: "High-grade Brass Core",
      plating: "22K Antique Micron Gold Finish",
      stones: "Uncut Glass Polki, Basra Micro Pearls",
      weight: "120 grams",
      closure: "Rear Openable Hinge with Security Lock",
    },
  },
  {
    id: "c88d990e-2233-5566-9900-bbccddeeff00",
    title: "Jashn Multi-Strand Festive Polki Haar",
    slug: "jashn-multi-strand-festive-polki-haar",
    price: 8499,
    sale_price: 6999,
    in_stock: true,
    is_bestseller: false,
    category: "Necklace",
    description:
      "Opulent multi-tiered long necklace strung with lustrous pastel gemstones and centered with a statement hand-inlaid Kundan medallion.",
    images: [
      "/products/necklace/necklace-09.jpg",
      "/products/necklace/necklace-10.jpg",
    ],
    specifications: {
      material: "Brass and Copper Core Alloy",
      plating: "18K Champagne Gold Electroplate",
      stones: "Handmade Glass Polki, Semi-precious Beads",
      weight: "140 grams",
      closure: "Adjustable Zari Cord",
    },
  },
  {
    id: "d99e001f-3344-6677-0011-ccddeeff0011",
    title: "Gulbano Ruby Encrusted Rajputi Choker",
    slug: "gulbano-ruby-encrusted-rajputi-choker",
    price: 6999,
    sale_price: 5999,
    in_stock: true,
    is_bestseller: false,
    category: "Necklace",
    description:
      "Inspired by royal Rajputana courts, this choker features ruby stimulants woven seamlessly with gold-plated bezels and delicate seed pearl drops.",
    images: [
      "/products/necklace/necklace-11.jpg",
      "/products/necklace/necklace-12.jpg",
    ],
    specifications: {
      material: "Brass Alloy Base",
      plating: "22K Antique Micron Gold Dip",
      stones: "Synthetic Pigeon Blood Rubies, Glass Polki",
      weight: "105 grams",
      closure: "Adjustable Silk Thread Dori",
    },
  },
  {
    id: "e00f112a-4455-7788-1122-ddeeff001122",
    title: "Kashmiri Piroi Emerald Choker Set",
    slug: "kashmiri-piroi-emerald-choker-set",
    price: 7699,
    sale_price: 6299,
    in_stock: true,
    is_bestseller: true,
    category: "Necklace",
    description:
      "Dainty yet magnificent choker strung with handcrafted emerald beads in the traditional Kashmiri piroi style, complete with matching chandelier earrings.",
    images: [
      "/products/necklace/necklace-13.jpg",
      "/products/necklace/necklace-14.jpg",
    ],
    specifications: {
      material: "Eco-friendly Brass Base",
      plating: "22K Yellow Micron Gold with Lacquer",
      stones: "Hydro Emerald Drops, Uncut Kundan",
      weight: "118 grams",
      closure: "Adjustable Dori",
    },
  },
  {
    id: "f11a223b-5566-8899-2233-eeff00112233",
    title: "Zeenat Chandrika Antique Bridal Hasli",
    slug: "zeenat-chandrika-antique-bridal-hasli",
    price: 8899,
    sale_price: 7299,
    in_stock: true,
    is_bestseller: false,
    category: "Necklace",
    description:
      "A show-stopping bridal centerpiece featuring crescent moon motifs, layered pearl tassels, and fine Meenakari enameling on the reverse side.",
    images: [
      "/products/necklace/necklace-17.jpg",
      "/products/necklace/necklace-18.jpg",
    ],
    specifications: {
      material: "Solid Brass Casting",
      plating: "24K Temple Gold Micro-Plated",
      stones: "Polki Glass, Fresh Water Shell Pearls",
      weight: "150 grams",
      closure: "Adjustable Gold Zari Cord",
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
      "/products/pendant-sets/pendant-sets-01.jpg",
      "/products/pendant-sets/pendant-sets-02.jpg",
    ],
    specifications: {
      material: "Solid Brass Alloy Base",
      plating: "18K Matte Royal Gold Plating",
      stones: "Fine Kundan, Hydro Emerald Drop, Seed Pearls",
      weight: "42 grams (set)",
      closure: "Delicate 18-inch Gold Chain with Lobster Clasp",
    },
  },
  {
    id: "p89e123a-4567-4890-bcde-123456789abc",
    title: "Sitara Solitaire Filigree Pendant & Earring Set",
    slug: "sitara-solitaire-filigree-pendant-earring-set",
    price: 4299,
    sale_price: 3499,
    in_stock: true,
    is_bestseller: false,
    category: "Pendant Sets",
    description:
      "Intricate geometric filigree gold work framing sparkling cubic zirconia centerpieces with lightweight matching floral tops.",
    images: [
      "/products/pendant-sets/pendant-sets-03.jpg",
      "/products/pendant-sets/pendant-sets-05.jpg",
    ],
    specifications: {
      material: "Artisanal Brass Alloy",
      plating: "18K Yellow Gold Micron Electroplated",
      stones: "AAA+ American Diamonds & Crystal Drops",
      weight: "32 grams",
      closure: "Adjustable 16-18 inch chain",
    },
  },
  {
    id: "q90f234b-5678-4901-cdef-234567890bcd",
    title: "Roohani Floral Kundan Drop Pendant Set",
    slug: "roohani-floral-kundan-drop-pendant-set",
    price: 4599,
    sale_price: 3799,
    in_stock: true,
    is_bestseller: true,
    category: "Pendant Sets",
    description:
      "A blooming floral silhouette featuring uncut Kundan petal settings suspended from an 18K gold chain, completed with dainty stud companions.",
    images: [
      "/products/pendant-sets/pendant-sets-04.jpg",
      "/products/pendant-sets/pendant-sets-06.jpg",
    ],
    specifications: {
      material: "Jeweller's Brass Base",
      plating: "18K Micro Gold Polish",
      stones: "Uncut Glass Kundan, Pearl Drop",
      weight: "38 grams",
      closure: "Spring-ring clasp with extender",
    },
  },
  {
    id: "r01a345c-6789-4012-def0-345678901cde",
    title: "Parijat Lotus Motif Daily Pendant Set",
    slug: "parijat-lotus-motif-daily-pendant-set",
    price: 3899,
    sale_price: 3199,
    in_stock: true,
    is_bestseller: false,
    category: "Pendant Sets",
    description:
      "A serene lotus blossom pendant adorned with micro-pavé zircons and an antique gold hue, accompanied by matching minimal daily earrings.",
    images: [
      "/products/pendant-sets/pendant-sets-07.jpg",
      "/products/pendant-sets/pendant-sets-08.jpg",
    ],
    specifications: {
      material: "Hypoallergenic Brass Core",
      plating: "Antique Champagne Gold Finish",
      stones: "AAA Micro Zircons",
      weight: "28 grams",
      closure: "Lobster Clasp with 2-inch Extension",
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
      "/products/everyday-wear/everyday-wear-01.jpg",
      "/products/everyday-wear/everyday-wear-02.png",
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
      "/products/earrings/earrings-01.jpg",
      "/products/earrings/earrings-02.jpg",
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
      "/products/earrings/earrings-03.jpg",
      "/products/earrings/earrings-04.jpg",
    ],
    specifications: {
      material: "Fine Artisan Copper Alloy",
      plating: "Antique Champagne Gold Electroplating",
      stones: "Hand-painted Gulabi Meena, Glass Polki, Seed Pearls",
      weight: "36 grams (pair)",
      closure: "Silver-needle post with butterfly clutch",
    },
  },
  {
    id: "s12b456d-7890-4123-ef01-456789012def",
    title: "Neelam Royal Sapphire Hue Stud Danglers",
    slug: "neelam-royal-sapphire-hue-stud-danglers",
    price: 3299,
    sale_price: 2699,
    in_stock: true,
    is_bestseller: true,
    category: "Earrings",
    description:
      "Deep royal sapphire-hued faceted stones framed by micro-paved crystal halos and dangling pearl clusters. A timeless heirloom for evening galas.",
    images: [
      "/products/earrings/earrings-05.jpg",
      "/products/earrings/earrings-06.png",
    ],
    specifications: {
      material: "Solid Brass Alloy",
      plating: "18K Yellow Gold Dip with Protective Coating",
      stones: "Synthetic Sapphire Crystals, Cultured Pearls",
      weight: "30 grams (pair)",
      closure: "Comfort Push-Back Post",
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
      "/rings.png",
      "/4550RS_B.png",
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
      "/products/bracelets/bracelets-01.jpg",
      "/products/bracelets/bracelets-02.jpg",
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
      "/products/bracelets/bracelets-03.jpg",
      "/products/bracelets/bracelets-04.jpg",
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
      "/products/mangalsutra/mangalsutra-01.jpg",
      "/products/mangalsutra/mangalsutra-02.jpg",
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

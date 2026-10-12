export interface CollectionCategory {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  pieceCount: number;
  image: string;
}

export const COLLECTIONS: CollectionCategory[] = [
  {
    id: "necklace",
    name: "Necklace",
    slug: "necklace",
    subtitle: "Chokers, Malas & Rani Haars",
    description: "Imperial Jadau and Polki chokers woven with Basra-style pearls and antique 22K gold micron plating.",
    pieceCount: 38,
    image: "/4550RS_B.png",
  },
  {
    id: "pendant-sets",
    name: "Pendant Sets",
    slug: "pendant-sets",
    subtitle: "Intricate Kundan & Gemstone Sets",
    description: "Versatile statement pendants paired with matching earrings for intimate festivities and soirées.",
    pieceCount: 24,
    image: "/pendant.png",
  },
  {
    id: "everyday-wear",
    name: "Everyday Wear",
    slug: "everyday-wear",
    subtitle: "Anti-Tarnish Minimalist Luxury",
    description: "Lightweight, hypoallergenic 18K yellow gold plated pieces crafted for modern daily elegance.",
    pieceCount: 42,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "earrings",
    name: "Earrings",
    slug: "earrings",
    subtitle: "Chandbalis, Jhumkas & Studs",
    description: "From dramatic wedding chandbalis with reverse Meenakari to lightweight everyday drops.",
    pieceCount: 56,
    image: "/earrings.png",
  },
  {
    id: "rings",
    name: "Rings",
    slug: "rings",
    subtitle: "Cocktail Statements & Bands",
    description: "Regal oversized Jadau cocktail rings and micro-pavé solitaire bands with adjustable comfort sizing.",
    pieceCount: 29,
    image: "/rings.png",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    slug: "bracelets",
    subtitle: "Artisanal Kadas & Tennis Chains",
    description: "Fluted 22K gold kadas with concealed clasps alongside glistening diamond-stimulant wristbands.",
    pieceCount: 31,
    image: "/bracelets.png",
  },
  {
    id: "mangalsutra",
    name: "Mangalsutra",
    slug: "mangalsutra",
    subtitle: "Sacred & Contemporary Heirlooms",
    description: "Auspicious black onyx beads united with diamond pendants and traditional temple gold motifs.",
    pieceCount: 19,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop",
  },
];

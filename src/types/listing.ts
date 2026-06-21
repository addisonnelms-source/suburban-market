export type ListingCategory =
  | "furniture"
  | "horse-brass"
  | "paint"
  | "home-decor"
  | "other";

export interface Listing {
  _id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ListingCategory;
  imageUrl?: string;
  featured?: boolean;
  sold?: boolean;
  createdAt?: string;
}

export const PAINT_CATEGORY: ListingCategory = "paint";

export const SHOP_CATEGORIES: ListingCategory[] = [
  "furniture",
  "horse-brass",
  "home-decor",
  "other",
];

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  furniture: "Furniture",
  "horse-brass": "Horse Brass",
  paint: "Fusion Paint",
  "home-decor": "Home Décor",
  other: "Other",
};

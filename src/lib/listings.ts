import sampleListings from "@/data/sample-listings.json";
import type { Listing, ListingCategory } from "@/types/listing";
import { PAINT_CATEGORY, SHOP_CATEGORIES } from "@/types/listing";
import { getSanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

const LISTINGS_QUERY = `*[_type == "listing"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  description,
  category,
  featured,
  sold,
  "createdAt": _createdAt,
  image
}`;

const LISTING_BY_SLUG_QUERY = `*[_type == "listing" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  price,
  description,
  category,
  featured,
  sold,
  "createdAt": _createdAt,
  image
}`;

interface SanityListing {
  _id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ListingCategory;
  featured?: boolean;
  sold?: boolean;
  createdAt?: string;
  image?: { asset: { _ref: string } };
}

function mapSanityListing(item: SanityListing): Listing {
  const imageUrl = item.image ? urlFor(item.image)?.width(800).url() : undefined;

  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    price: item.price,
    description: item.description,
    category: item.category,
    featured: item.featured,
    sold: item.sold,
    createdAt: item.createdAt,
    imageUrl,
  };
}

export async function getListings(): Promise<Listing[]> {
  const client = getSanityClient();

  if (!client) {
    return sampleListings as Listing[];
  }

  try {
    const results = await client.fetch<SanityListing[]>(LISTINGS_QUERY);
    if (results.length === 0) return sampleListings as Listing[];
    return results.map(mapSanityListing);
  } catch {
    return sampleListings as Listing[];
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const client = getSanityClient();

  if (!client) {
    const listing = (sampleListings as Listing[]).find((l) => l.slug === slug);
    return listing ?? null;
  }

  try {
    const result = await client.fetch<SanityListing | null>(LISTING_BY_SLUG_QUERY, {
      slug,
    });
    return result ? mapSanityListing(result) : null;
  } catch {
    const listing = (sampleListings as Listing[]).find((l) => l.slug === slug);
    return listing ?? null;
  }
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const listings = await getShopListings();
  return listings.filter((l) => l.featured && !l.sold).slice(0, limit);
}

export async function getShopListings(): Promise<Listing[]> {
  const listings = await getListings();
  return listings.filter((l) => l.category !== PAINT_CATEGORY);
}

export async function getPaintListings(): Promise<Listing[]> {
  const listings = await getListings();
  return listings.filter((l) => l.category === PAINT_CATEGORY);
}

export function isPaintListing(listing: Listing): boolean {
  return listing.category === PAINT_CATEGORY;
}

export function isShopListing(listing: Listing): boolean {
  return SHOP_CATEGORIES.includes(listing.category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

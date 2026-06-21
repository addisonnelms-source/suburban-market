import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/ListingDetail";
import {
  getListingBySlug,
  getShopListings,
  isShopListing,
} from "@/lib/listings";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const listings = await getShopListings();
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing || !isShopListing(listing)) return { title: "Not found" };

  return {
    title: listing.title,
    description: listing.description,
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing || !isShopListing(listing)) notFound();

  return (
    <ListingDetail
      listing={listing}
      backHref="/shop"
      backLabel="Back to shop"
    />
  );
}

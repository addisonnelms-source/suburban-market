import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/ListingDetail";
import {
  getListingBySlug,
  getPaintListings,
  isPaintListing,
} from "@/lib/listings";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const listings = await getPaintListings();
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing || !isPaintListing(listing)) return { title: "Not found" };

  return {
    title: listing.title,
    description: listing.description,
  };
}

export default async function PaintListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing || !isPaintListing(listing)) notFound();

  return (
    <ListingDetail
      listing={listing}
      backHref="/fusion-paint/browse"
      backLabel="Back to Fusion Paint"
    />
  );
}

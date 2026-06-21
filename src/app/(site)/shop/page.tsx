import { ListingGrid } from "@/components/ListingGrid";
import { getShopListings } from "@/lib/listings";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse antiques and refinished furniture at ${site.name}.`,
};

export default async function ShopPage() {
  const listings = await getShopListings();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-brown">Shop</h1>
        <p className="mt-3 max-w-xl text-brown/70">
          Browse antiques and refinished furniture at the booth. Prices shown —
          pickup in person at {site.hostStore.name}.
        </p>
      </div>

      <ListingGrid listings={listings} />
    </div>
  );
}

import Link from "next/link";
import { ListingGrid } from "@/components/ListingGrid";
import { getPaintListings } from "@/lib/listings";
import { formatAddress, site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fusion Paint",
  description: `${site.name} is an authorized Fusion Mineral Paint vendor in Springdale, Arkansas.`,
};

export default async function FusionPaintBrowsePage() {
  const paintListings = await getPaintListings();

  return (
    <>
      <section>
        <h2 className="font-serif text-2xl text-brown">Available at the booth</h2>
        <p className="mt-2 text-brown/60">
          In-stock paint and supplies. No online checkout — pickup in person.
        </p>

        <div className="mt-8">
          <ListingGrid
            listings={paintListings}
            basePath="/fusion-paint"
            showCategoryFilter={false}
            showCategoryOnCard={false}
            emptyMessage="No paint listings yet — check back soon."
          />
        </div>
      </section>

      <p className="mt-10 text-sm text-brown/50">
        Visit us at {formatAddress()}.{" "}
        <Link href="/about" className="text-brown underline underline-offset-2">
          About the booth
        </Link>
      </p>
    </>
  );
}

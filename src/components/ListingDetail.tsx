import Link from "next/link";
import { formatPrice } from "@/lib/listings";
import { site } from "@/lib/site";
import type { Listing } from "@/types/listing";
import { CATEGORY_LABELS } from "@/types/listing";

interface ListingDetailProps {
  listing: Listing;
  backHref: string;
  backLabel: string;
}

export function ListingDetail({ listing, backHref, backLabel }: ListingDetailProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href={backHref}
        className="mb-8 inline-flex text-sm text-brown/60 transition-colors hover:text-brown"
      >
        ← {backLabel}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-brown/10 bg-cream-dark">
          {listing.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brown/30">
              <svg viewBox="0 0 64 64" fill="none" className="h-24 w-24" aria-hidden>
                <rect x="8" y="28" width="48" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 28V20a8 8 0 0116 0v8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          )}
          {listing.sold && (
            <span className="absolute top-4 left-4 rounded-full bg-brown px-4 py-1.5 text-sm font-medium text-cream">
              Sold
            </span>
          )}
        </div>

        <div>
          <span className="text-xs font-medium tracking-wide text-sage uppercase">
            {CATEGORY_LABELS[listing.category]}
          </span>
          <h1 className="mt-2 font-serif text-3xl text-brown sm:text-4xl">
            {listing.title}
          </h1>
          <p className="mt-4 text-2xl font-medium text-brown">
            {formatPrice(listing.price)}
          </p>

          <div className="mt-8 border-t border-brown/10 pt-8">
            <h2 className="text-sm font-medium tracking-wide text-brown/50 uppercase">
              Description
            </h2>
            <p className="mt-3 leading-relaxed text-brown/80 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {!listing.sold && (
            <div className="mt-8 rounded-xl bg-white p-6 ring-1 ring-brown/10">
              <p className="font-medium text-brown">Interested in this item?</p>
              <p className="mt-2 text-sm leading-relaxed text-brown/70">
                Available for in-person pickup at {site.hostStore.name}. Visit the
                booth or{" "}
                <Link href="/about" className="text-brown underline underline-offset-2">
                  get in touch
                </Link>{" "}
                to ask about availability.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

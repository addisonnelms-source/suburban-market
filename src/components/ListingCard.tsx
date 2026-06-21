import Link from "next/link";
import { formatPrice } from "@/lib/listings";
import type { Listing } from "@/types/listing";
import { CATEGORY_LABELS } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
  basePath?: string;
  showCategory?: boolean;
}

export function ListingCard({
  listing,
  basePath = "/shop",
  showCategory = true,
}: ListingCardProps) {
  return (
    <Link
      href={`${basePath}/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brown/10 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-cream-dark">
        {listing.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PlaceholderIcon />
          </div>
        )}
        {listing.sold && (
          <span className="absolute top-3 left-3 rounded-full bg-brown px-3 py-1 text-xs font-medium tracking-wide text-cream uppercase">
            Sold
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {showCategory && (
          <span className="text-xs font-medium tracking-wide text-sage uppercase">
            {CATEGORY_LABELS[listing.category]}
          </span>
        )}
        <h3 className="font-serif text-lg leading-snug text-brown group-hover:underline">
          {listing.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-brown/60">
          {listing.description}
        </p>
        <p className="mt-1 font-medium text-brown">{formatPrice(listing.price)}</p>
      </div>
    </Link>
  );
}

function PlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-16 w-16 text-brown/20"
      aria-hidden
    >
      <rect x="8" y="28" width="48" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 28V20a8 8 0 0116 0v8" stroke="currentColor" strokeWidth="2" />
      <path d="M32 28V18a6 6 0 0112 0v10" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="36" x2="52" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="44" x2="52" y2="44" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/ListingCard";
import type { Listing, ListingCategory } from "@/types/listing";
import { CATEGORY_LABELS, SHOP_CATEGORIES } from "@/types/listing";

interface ListingGridProps {
  listings: Listing[];
  basePath?: string;
  showCategoryFilter?: boolean;
  showCategoryOnCard?: boolean;
  emptyMessage?: string;
}

export function ListingGrid({
  listings,
  basePath = "/shop",
  showCategoryFilter = true,
  showCategoryOnCard = true,
  emptyMessage = "No items in this category yet.",
}: ListingGridProps) {
  const [category, setCategory] = useState<ListingCategory | "all">("all");
  const [showSold, setShowSold] = useState(false);

  const categories: (ListingCategory | "all")[] = showCategoryFilter
    ? ["all", ...SHOP_CATEGORIES]
    : ["all"];

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      if (!showSold && listing.sold) return false;
      if (category !== "all" && listing.category !== category) return false;
      return true;
    });
  }, [listings, category, showSold]);

  return (
    <div>
      {showCategoryFilter && (
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-brown text-cream"
                  : "bg-white text-brown/70 ring-1 ring-brown/15 hover:text-brown"
              }`}
            >
              {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          ))}

          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-brown/60">
            <input
              type="checkbox"
              checked={showSold}
              onChange={(e) => setShowSold(e.target.checked)}
              className="rounded border-brown/30 text-brown focus:ring-brown/30"
            />
            Show sold items
          </label>
        </div>
      )}

      {!showCategoryFilter && (
        <div className="mb-8 flex justify-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-brown/60">
            <input
              type="checkbox"
              checked={showSold}
              onChange={(e) => setShowSold(e.target.checked)}
              className="rounded border-brown/30 text-brown focus:ring-brown/30"
            />
            Show sold items
          </label>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-brown/50">{emptyMessage}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              basePath={basePath}
              showCategory={showCategoryOnCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

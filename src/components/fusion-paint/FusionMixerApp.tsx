"use client";

import { useState } from "react";
import {
  catalogUpdate,
  disclaimer,
  mineralPaintCount,
  type PresetRecipe,
} from "@/lib/fusion/fusion-data";
import { Gallery } from "./Gallery";
import { Mixer } from "./Mixer";

type Tab = "gallery" | "mixer";

export function FusionMixerApp() {
  const [tab, setTab] = useState<Tab>("gallery");
  const [loadedRecipe, setLoadedRecipe] = useState<PresetRecipe | null>(null);

  const handleSelectRecipe = (recipe: PresetRecipe) => {
    setLoadedRecipe(recipe);
    setTab("mixer");
  };

  return (
    <div>
      <p className="mb-6 text-brown/70">
        {mineralPaintCount} Fusion Mineral Paint colors — discover what greys can
        become. Mix custom blends before you shop the booth.
      </p>

      <div className="mb-6 rounded-xl border border-brown/10 bg-white px-4 py-3 text-center text-sm text-brown/70">
        <span className="font-medium text-brown">Color catalog updated.</span>{" "}
        {catalogUpdate.updatedCount} of {catalogUpdate.totalMineral} mineral paint
        colors now use hex values from the {catalogUpdate.source}.
      </div>

      <nav className="mb-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setTab("gallery")}
          className={`rounded-full px-6 py-2 text-sm font-medium transition ${
            tab === "gallery"
              ? "bg-brown text-cream"
              : "bg-white text-brown/70 hover:bg-cream"
          }`}
        >
          Recipe Gallery
        </button>
        <button
          type="button"
          onClick={() => setTab("mixer")}
          className={`rounded-full px-6 py-2 text-sm font-medium transition ${
            tab === "mixer"
              ? "bg-brown text-cream"
              : "bg-white text-brown/70 hover:bg-cream"
          }`}
        >
          Free Mixer
        </button>
      </nav>

      <div className="rounded-xl border border-brown/10 bg-white p-6 sm:p-8">
        {tab === "gallery" ? (
          <Gallery onSelectRecipe={handleSelectRecipe} />
        ) : (
          <Mixer
            initialRecipe={loadedRecipe}
            onRecipeLoaded={() => setLoadedRecipe(null)}
          />
        )}
      </div>

      <p className="mt-6 text-center text-xs text-brown/40">{disclaimer}</p>
    </div>
  );
}

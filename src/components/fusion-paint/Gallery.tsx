"use client";

import {
  findClosestColor,
  formatRatioLine,
  mixColors,
  rgbToHex,
} from "@/lib/fusion/color-math";
import {
  getColorByName,
  mineralCatalog,
  presetRecipes,
  type PresetRecipe,
} from "@/lib/fusion/fusion-data";
import { RecipeCard } from "./RecipeCard";

type GalleryProps = {
  onSelectRecipe: (recipe: PresetRecipe) => void;
};

function computeRecipe(recipe: PresetRecipe) {
  const parts = recipe.colors
    .map((c) => {
      const color = getColorByName(c.name);
      if (!color) return null;
      return { name: c.name, ratio: c.ratio, rgb: color.rgb, hex: color.hex };
    })
    .filter(Boolean) as {
    name: string;
    ratio: number;
    rgb: { r: number; g: number; b: number };
    hex: string;
  }[];

  const mixed = mixColors(parts.map((p) => ({ rgb: p.rgb, ratio: p.ratio })));
  const mixHex = rgbToHex(mixed);
  const closest = findClosestColor(mixed, mineralCatalog);

  return {
    mixHex,
    ratioLine: formatRatioLine(parts),
    closestName: closest.match.name,
    closestHex: closest.match.hex,
    isCustomBlend: closest.isCustomBlend,
  };
}

export function Gallery({ onSelectRecipe }: GalleryProps) {
  return (
    <div>
      <p className="mb-6 text-brown/70">
        Grey doesn&apos;t have to be boring. Explore preset blends that
        transform neutral Fusion colors into something customers actually want.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {presetRecipes.map((recipe) => {
          const result = computeRecipe(recipe);
          return (
            <RecipeCard
              key={recipe.name}
              mixName={recipe.name}
              mixHex={result.mixHex}
              ratioLine={result.ratioLine}
              closestName={result.closestName}
              closestHex={result.closestHex}
              isCustomBlend={result.isCustomBlend}
              tagline={recipe.tagline}
              compact
              onUse={() => onSelectRecipe(recipe)}
            />
          );
        })}
      </div>
    </div>
  );
}

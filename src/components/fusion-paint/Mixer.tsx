"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  findClosestColor,
  formatRatioLine,
  mixColors,
  rgbToHex,
} from "@/lib/fusion/color-math";
import {
  getColorByName,
  greyBases,
  mineralCatalog,
  type PresetRecipe,
} from "@/lib/fusion/fusion-data";
import { ColorPicker } from "./ColorPicker";
import { RecipeCard } from "./RecipeCard";

type MixerPart = {
  name: string;
  ratio: number;
};

type MixerProps = {
  initialRecipe?: PresetRecipe | null;
  onRecipeLoaded?: () => void;
};

function recipeToParts(recipe: PresetRecipe): {
  grey: string;
  accent1: string;
  accent2: string;
  ratios: [number, number, number];
  mixName: string;
} {
  const grey = recipe.colors[0]?.name ?? greyBases[0]?.name ?? "";
  const accent1 = recipe.colors[1]?.name ?? "";
  const accent2 = recipe.colors[2]?.name ?? "";
  const r0 = recipe.colors[0]?.ratio ?? 100;
  const r1 = recipe.colors[1]?.ratio ?? 0;
  const r2 = recipe.colors[2]?.ratio ?? 0;
  return {
    grey,
    accent1,
    accent2,
    ratios: [r0, r1, r2],
    mixName: recipe.name,
  };
}

export function Mixer({ initialRecipe, onRecipeLoaded }: MixerProps) {
  const [baseName, setBaseName] = useState(greyBases[0]?.name ?? "");
  const [accent1Name, setAccent1Name] = useState("");
  const [accent2Name, setAccent2Name] = useState("");
  const [ratios, setRatios] = useState<[number, number, number]>([100, 0, 0]);
  const [mixName, setMixName] = useState("My Custom Blend");
  const [accentCount, setAccentCount] = useState<0 | 1 | 2>(0);

  const loadRecipe = useCallback((recipe: PresetRecipe) => {
    const parsed = recipeToParts(recipe);
    setBaseName(parsed.grey);
    setAccent1Name(parsed.accent1);
    setAccent2Name(parsed.accent2);
    setRatios(parsed.ratios);
    setMixName(parsed.mixName);
    setAccentCount(parsed.accent2 ? 2 : parsed.accent1 ? 1 : 0);
  }, []);

  useEffect(() => {
    if (initialRecipe) {
      loadRecipe(initialRecipe);
      onRecipeLoaded?.();
    }
  }, [initialRecipe, loadRecipe, onRecipeLoaded]);

  const parts: MixerPart[] = useMemo(() => {
    const list: MixerPart[] = [{ name: baseName, ratio: ratios[0] }];
    if (accentCount >= 1 && accent1Name)
      list.push({ name: accent1Name, ratio: ratios[1] });
    if (accentCount >= 2 && accent2Name)
      list.push({ name: accent2Name, ratio: ratios[2] });
    return list.filter((p) => p.ratio > 0 && p.name);
  }, [baseName, accent1Name, accent2Name, accentCount, ratios]);

  const result = useMemo(() => {
    const inputs = parts
      .map((p) => {
        const c = getColorByName(p.name);
        return c ? { rgb: c.rgb, ratio: p.ratio } : null;
      })
      .filter(Boolean) as {
      rgb: { r: number; g: number; b: number };
      ratio: number;
    }[];

    if (inputs.length === 0) {
      return null;
    }

    const mixed = mixColors(inputs);
    const mixHex = rgbToHex(mixed);
    const closest = findClosestColor(mixed, mineralCatalog);

    return {
      mixHex,
      ratioLine: formatRatioLine(parts),
      closestName: closest.match.name,
      closestHex: closest.match.hex,
      isCustomBlend: closest.isCustomBlend,
    };
  }, [parts]);

  const updateRatio = (index: 0 | 1 | 2, value: number) => {
    setRatios((prev) => {
      const next: [number, number, number] = [...prev] as [
        number,
        number,
        number,
      ];
      next[index] = value;

      if (accentCount === 0) {
        next[0] = 100;
        next[1] = 0;
        next[2] = 0;
      } else if (accentCount === 1) {
        if (index === 0) {
          next[0] = value;
          next[1] = 100 - value;
        } else {
          next[1] = value;
          next[0] = 100 - value;
        }
        next[2] = 0;
      } else {
        const clamped = Math.min(100, Math.max(0, value));
        next[index] = clamped;
        const remaining = 100 - clamped;
        const others = [0, 1, 2].filter((i) => i !== index) as [0 | 1 | 2, 0 | 1 | 2];
        const sumOthers = next[others[0]] + next[others[1]];
        if (sumOthers > 0) {
          next[others[0]] = Math.round(
            (next[others[0]] / sumOthers) * remaining
          );
          next[others[1]] = remaining - next[others[0]];
        } else {
          next[others[0]] = Math.round(remaining / 2);
          next[others[1]] = remaining - next[others[0]];
        }
      }

      return next;
    });
  };

  const firstNonBaseColor = () => {
    const used = new Set([baseName]);
    return mineralCatalog.find((c) => !used.has(c.name))?.name ?? "";
  };

  const handleAccentCount = (count: 0 | 1 | 2) => {
    setAccentCount(count);
    if (count === 0) {
      setAccent1Name("");
      setAccent2Name("");
      setRatios([100, 0, 0]);
    } else if (count === 1) {
      setAccent2Name("");
      setAccent1Name(accent1Name || firstNonBaseColor());
      setRatios([80, 20, 0]);
    } else {
      const a1 = accent1Name || firstNonBaseColor();
      const used = new Set([baseName, a1]);
      const a2 =
        accent2Name ||
        mineralCatalog.find((c) => !used.has(c.name))?.name ||
        "";
      setAccent1Name(a1);
      setAccent2Name(a2);
      setRatios([70, 20, 10]);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-1 font-serif text-lg font-semibold text-brown">
          1. Pick a base color
        </h2>
        <p className="mb-3 text-sm text-brown/60">
          Start with a grey neutral, or choose any of {mineralCatalog.length}{" "}
          Fusion Mineral Paint colors.
        </p>
        <ColorPicker
          colors={mineralCatalog}
          selected={baseName}
          onSelect={setBaseName}
          showGreyFilter
        />
      </section>

      <section>
        <h2 className="mb-1 font-serif text-lg font-semibold text-brown">
          2. Add mix color(s)
        </h2>
        <p className="mb-3 text-sm text-brown/60">
          Blend in up to 2 more colors from the full mineral paint line.
        </p>
        <div className="mb-4 flex gap-2">
          {([0, 1, 2] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleAccentCount(n)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                accentCount === n
                  ? "bg-brown text-cream"
                  : "bg-cream-dark text-brown/70 hover:bg-cream"
              }`}
            >
              {n === 0 ? "Base only" : n === 1 ? "1 color" : "2 colors"}
            </button>
          ))}
        </div>
        {accentCount >= 1 && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-brown/70">
              First mix color
            </p>
            <ColorPicker
              colors={mineralCatalog.filter((c) => c.name !== baseName)}
              selected={accent1Name}
              onSelect={setAccent1Name}
            />
          </div>
        )}
        {accentCount >= 2 && (
          <div>
            <p className="mb-2 text-sm font-medium text-brown/70">
              Second mix color
            </p>
            <ColorPicker
              colors={mineralCatalog.filter(
                (c) => c.name !== baseName && c.name !== accent1Name
              )}
              selected={accent2Name}
              onSelect={setAccent2Name}
            />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-brown">
          3. Adjust ratios
        </h2>
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm text-brown/70">
              <span>{baseName}</span>
              <span>{ratios[0]}%</span>
            </label>
            <input
              type="range"
              min={accentCount === 0 ? 100 : 10}
              max={accentCount === 0 ? 100 : 95}
              value={ratios[0]}
              disabled={accentCount === 0}
              onChange={(e) => updateRatio(0, Number(e.target.value))}
              className="mt-1 w-full accent-brown"
            />
          </div>
          {accentCount >= 1 && accent1Name && (
            <div>
              <label className="flex justify-between text-sm text-brown/70">
                <span>{accent1Name}</span>
                <span>{ratios[1]}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={accentCount === 1 ? 90 : 60}
                value={ratios[1]}
                onChange={(e) => updateRatio(1, Number(e.target.value))}
                className="mt-1 w-full accent-brown"
              />
            </div>
          )}
          {accentCount >= 2 && accent2Name && (
            <div>
              <label className="flex justify-between text-sm text-brown/70">
                <span>{accent2Name}</span>
                <span>{ratios[2]}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={50}
                value={ratios[2]}
                onChange={(e) => updateRatio(2, Number(e.target.value))}
                className="mt-1 w-full accent-brown"
              />
            </div>
          )}
        </div>
      </section>

      {result && (
        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-brown">
            4. Your mix
          </h2>
          <label className="mb-3 block text-sm text-brown/60">Mix name</label>
          <input
            type="text"
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            className="mb-4 w-full rounded-lg border border-brown/15 px-3 py-2 text-brown"
          />
          <RecipeCard
            mixName={mixName}
            mixHex={result.mixHex}
            ratioLine={result.ratioLine}
            closestName={result.closestName}
            closestHex={result.closestHex}
            isCustomBlend={result.isCustomBlend}
          />
        </section>
      )}
    </div>
  );
}

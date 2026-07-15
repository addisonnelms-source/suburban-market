import fusionColorsRaw from "@/data/fusion-colors.json";
import paletteRaw from "@/data/fusion-palette-v1.json";
import type { RGB } from "./color-math";

export type FusionColor = {
  name: string;
  handle: string;
  hex: string;
  rgb: RGB;
  type: string;
};

export type PresetRecipe = {
  name: string;
  tagline: string;
  colors: { name: string; ratio: number }[];
};

const EXCLUDED_NAME_PATTERNS = [
  /metallic/i,
  /kit/i,
  /bundle/i,
  /^buy a/i,
  /holiday/i,
  /kitchen/i,
  /cureiously/i,
  /tester gift/i,
];

function isMineralPaint(name: string, type: string): boolean {
  if (type !== "Fusion Mineral Paint") return false;
  return !EXCLUDED_NAME_PATTERNS.some((p) => p.test(name));
}

function toFusionColor(raw: (typeof fusionColorsRaw.colors)[0]): FusionColor {
  return {
    name: raw.name,
    handle: raw.handle,
    hex: raw.hex,
    rgb: { r: raw.rgb[0], g: raw.rgb[1], b: raw.rgb[2] },
    type: raw.type,
  };
}

const allColors = fusionColorsRaw.colors.map(toFusionColor);

export const mineralCatalog: FusionColor[] = allColors.filter((c) =>
  isMineralPaint(c.name, c.type)
);

const byName = new Map(allColors.map((c) => [c.name, c]));

export function getColorByName(name: string): FusionColor | undefined {
  return byName.get(name);
}

export const greyBases: FusionColor[] = paletteRaw.greyBases
  .map(getColorByName)
  .filter((c): c is FusionColor => !!c);

export const accents: FusionColor[] = paletteRaw.accents
  .map(getColorByName)
  .filter((c): c is FusionColor => !!c);

export const presetRecipes: PresetRecipe[] = paletteRaw.presetRecipes;

export const disclaimer = fusionColorsRaw.disclaimer;

export const catalogUpdate = {
  source: "Fusion barcode workbook (May 2026)",
  updatedCount: fusionColorsRaw.colors.filter(
    (c) =>
      c.type === "Fusion Mineral Paint" &&
      c.source === "fusion_barcodes_workbook_2026_05_07"
  ).length,
  totalMineral: mineralCatalog.length,
} as const;

export const mineralPaintCount = mineralCatalog.length;

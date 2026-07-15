export type RGB = { r: number; g: number; b: number };

export type MixInput = {
  rgb: RGB;
  ratio: number;
};

const CUSTOM_BLEND_THRESHOLD = 18; // Lab distance — above this = "custom blend"

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(Math.min(255, Math.max(0, v * 255)));
}

export function rgbToLab({ r, g, b }: RGB): { l: number; a: number; b: number } {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);

  const x = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  const y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  const z = (R * 0.0193339 + G * 0.119192 + B * 0.9503041) / 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function labToXyz(l: number, a: number, b: number) {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;

  const inv = (t: number) => {
    const t3 = t * t * t;
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  };

  return {
    x: inv(fx) * 0.95047,
    y: inv(fy),
    z: inv(fz) * 1.08883,
  };
}

export function labToRgb(l: number, a: number, b: number): RGB {
  const { x, y, z } = labToXyz(l, a, b);

  const r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  const bl = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  return {
    r: linearToSrgb(r),
    g: linearToSrgb(g),
    b: linearToSrgb(bl),
  };
}

export function mixColors(inputs: MixInput[]): RGB {
  if (inputs.length === 0) return { r: 128, g: 128, b: 128 };

  const total = inputs.reduce((sum, i) => sum + i.ratio, 0) || 1;
  let l = 0;
  let a = 0;
  let b = 0;

  for (const input of inputs) {
    const weight = input.ratio / total;
    const lab = rgbToLab(input.rgb);
    l += lab.l * weight;
    a += lab.a * weight;
    b += lab.b * weight;
  }

  return labToRgb(l, a, b);
}

export function labDistance(
  c1: { l: number; a: number; b: number },
  c2: { l: number; a: number; b: number }
): number {
  return Math.sqrt(
    (c1.l - c2.l) ** 2 + (c1.a - c2.a) ** 2 + (c1.b - c2.b) ** 2
  );
}

export function rgbToHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function findClosestColor<T extends { rgb: RGB; name: string }>(
  target: RGB,
  catalog: T[]
): { match: T; distance: number; isCustomBlend: boolean } {
  const targetLab = rgbToLab(target);
  let best = catalog[0];
  let bestDist = Infinity;

  for (const color of catalog) {
    const d = labDistance(targetLab, rgbToLab(color.rgb));
    if (d < bestDist) {
      bestDist = d;
      best = color;
    }
  }

  return {
    match: best,
    distance: bestDist,
    isCustomBlend: bestDist > CUSTOM_BLEND_THRESHOLD,
  };
}

export function formatRatioLine(
  parts: { name: string; ratio: number }[]
): string {
  return parts.map((p) => `${p.ratio}% ${p.name}`).join(" + ");
}

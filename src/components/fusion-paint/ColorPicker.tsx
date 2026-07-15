"use client";

import { useMemo, useState } from "react";
import type { FusionColor } from "@/lib/fusion/fusion-data";
import { greyBases } from "@/lib/fusion/fusion-data";
import { ColorSwatch } from "./ColorSwatch";

const greyNames = new Set(greyBases.map((c) => c.name));

type ColorPickerProps = {
  colors: FusionColor[];
  selected: string;
  onSelect: (name: string) => void;
  showGreyFilter?: boolean;
  placeholder?: string;
};

export function ColorPicker({
  colors,
  selected,
  onSelect,
  showGreyFilter = false,
  placeholder = "Search colors…",
}: ColorPickerProps) {
  const [search, setSearch] = useState("");
  const [greyOnly, setGreyOnly] = useState(showGreyFilter);

  const filtered = useMemo(() => {
    let list = colors;
    if (greyOnly) {
      list = list.filter((c) => greyNames.has(c.name));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [colors, search, greyOnly]);

  return (
    <div>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-brown/15 bg-white px-3 py-2 text-sm text-brown"
        />
        {showGreyFilter && (
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => setGreyOnly(true)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                greyOnly
                  ? "bg-brown text-cream"
                  : "bg-cream-dark text-brown/70 hover:bg-cream"
              }`}
            >
              Greys ({greyBases.length})
            </button>
            <button
              type="button"
              onClick={() => setGreyOnly(false)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                !greyOnly
                  ? "bg-brown text-cream"
                  : "bg-cream-dark text-brown/70 hover:bg-cream"
              }`}
            >
              All ({colors.length})
            </button>
          </div>
        )}
      </div>

      <p className="mb-2 text-xs text-brown/40">
        {filtered.length} color{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="max-h-64 overflow-y-auto rounded-lg border border-brown/10 bg-white p-2">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {filtered.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onSelect(c.name)}
              className={`rounded-lg p-1 transition ${
                selected === c.name
                  ? "ring-2 ring-brown ring-offset-1"
                  : "hover:ring-1 hover:ring-brown/30"
              }`}
            >
              <ColorSwatch hex={c.hex} label={c.name} size="sm" />
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-brown/40">
            No colors match your search.
          </p>
        )}
      </div>
    </div>
  );
}

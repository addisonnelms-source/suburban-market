import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fusion Paint Mixer",
  description: "Mix Fusion Mineral Paint colors — coming soon.",
};

export default function FusionPaintMixerPage() {
  return (
    <div className="rounded-xl border border-brown/10 bg-white px-8 py-16 text-center">
      <h2 className="font-serif text-2xl text-brown">Fusion Paint Mixer</h2>
      <p className="mx-auto mt-4 max-w-md text-brown/70">
        A color mixing tool for Fusion greys and custom blends is coming soon.
        Check back here to experiment with paint recipes before you buy.
      </p>
    </div>
  );
}

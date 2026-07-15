import type { Metadata } from "next";
import { FusionMixerApp } from "@/components/fusion-paint/FusionMixerApp";

export const metadata: Metadata = {
  title: "Fusion Paint Mixer",
  description:
    "Mix Fusion Mineral Paint colors — explore grey recipes and custom blends.",
};

export default function FusionPaintMixerPage() {
  return <FusionMixerApp />;
}

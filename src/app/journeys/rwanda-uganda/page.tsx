import type { Metadata } from "next";
import RwandaUgandaClient from "./RwandaUgandaClient";

export const metadata: Metadata = {
  title: "Rwanda and Uganda",
  description:
    "Misty mountain sanctuaries, primal rainforests, and an intimate gaze with mountain gorillas. An 8-day private journey into the heart of Central Africa.",
  openGraph: {
    title: "Rwanda and Uganda | Arcane Expeditions",
    description:
      "Misty mountain sanctuaries, primal rainforests, and an intimate gaze with mountain gorillas. An 8-day private journey into the heart of Central Africa.",
    images: [{ url: "/rwanda-ug.jpg", width: 1200, height: 630 }],
  },
};

export default function RwandaUgandaPage() {
  return <RwandaUgandaClient />;
}

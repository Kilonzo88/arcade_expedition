import type { Metadata } from "next";
import KenyaTanzaniaClient from "./KenyaTanzaniaClient";

export const metadata: Metadata = {
  title: "Kenya and Tanzania",
  description:
    "The endless savanna pulse, Mara river crossings, and untamed natural drama across the Serengeti. A 12-day private safari through East Africa's greatest wildlife corridors.",
  openGraph: {
    title: "Kenya and Tanzania | Arcane Expeditions",
    description:
      "The endless savanna pulse, Mara river crossings, and untamed natural drama across the Serengeti. A 12-day private safari through East Africa's greatest wildlife corridors.",
    images: [{ url: "/savannah-kenya-tz.png", width: 1200, height: 630 }],
  },
};

export default function KenyaTanzaniaPage() {
  return <KenyaTanzaniaClient />;
}

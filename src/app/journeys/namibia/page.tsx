import type { Metadata } from "next";
import NamibiaClient from "./NamibiaClient";

export const metadata: Metadata = {
  title: "Namibia",
  description:
    "Ancient clay pans, soaring red dunes, and desert-adapted wildlife under vast cosmic skies. A 10-day private safari through one of Africa's most otherworldly landscapes.",
  openGraph: {
    title: "Namibia | Arcane Expeditions",
    description:
      "Ancient clay pans, soaring red dunes, and desert-adapted wildlife under vast cosmic skies. A 10-day private safari through one of Africa's most otherworldly landscapes.",
    images: [{ url: "/deadvlei.jpg", width: 1200, height: 630 }],
  },
};

export default function NamibiaPage() {
  return <NamibiaClient />;
}

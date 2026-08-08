import AboutSection from "@/app/components/AboutSection";
import HomeFooter from "@/app/components/HomeFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Arcane Expeditions",
  description:
    "Arcane Expeditions was founded on a simple belief: safari should feel like being hosted, not herded.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen section-ivory flex flex-col justify-between pt-16 md:pt-20">
      <main>
        <AboutSection />
      </main>
      <HomeFooter />
    </div>
  );
}

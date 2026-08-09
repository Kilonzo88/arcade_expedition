import HeroBackground from "./components/HeroBackground";
import { HeroCopy } from "@/components/HeroCopy";
import CuratedCollections from "./components/CuratedCollections";
import HomePhilosophy from "./components/HomePhilosophy";
import HomeFooter from "./components/HomeFooter";
import JourneysSection from "./components/JourneysSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative">
        <HeroBackground />
        <HeroCopy />
      </div>

      {/* ── Curated Collections carousel ─────────────────────── */}
      <CuratedCollections />

      {/* ── Shared container: Philosophy ─────────────────────── */}
      <div className="section-ivory">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <HomePhilosophy />
        </div>
      </div>

      {/* ── Home Footer ──────────────────────────────────────── */}
      <HomeFooter />

      {/* ── Journeys Section ──────────────────────────────────── */}
      <JourneysSection />
      <HomeFooter />

      {/* ── About / Our Story ─────────────────────────────────── */}
      <AboutSection />
      <HomeFooter />

      {/* ── Plan Your Journey / Contact Section ──────────────── */}
      <ContactSection />
      <HomeFooter />
    </>
  );
}


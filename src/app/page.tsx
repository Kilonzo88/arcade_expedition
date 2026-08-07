import HeroBackground from "./components/HeroBackground";
import { HeroCopy } from "@/components/HeroCopy";
import CuratedCollections from "./components/CuratedCollections";
import HomePhilosophy from "./components/HomePhilosophy";
import HomeFooter from "./components/HomeFooter";
import Link from "next/link";

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

      {/* ── Shared container: CTA + Philosophy + Footer ──────── */}
      <div className="section-ivory">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

          {/* View All Journeys CTA */}
          <div className="mt-4 mb-10 md:mb-16 flex justify-start">
            <Link
              href="/journeys"
              className="block w-full md:w-auto md:min-w-[280px] text-center"
              style={{
                backgroundColor: "var(--dark)",
                color: "var(--ivory)",
                borderRadius: "2px",
                padding: "16px",
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.04em",
              }}
            >
              View All Journeys
            </Link>
          </div>

          {/* Philosophy strip */}
          <HomePhilosophy />

        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <HomeFooter />
    </>
  );
}

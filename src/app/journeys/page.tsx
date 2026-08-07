import JourneysSection from "@/app/components/JourneysSection";
import HomeFooter from "@/app/components/HomeFooter";

export default function JourneysPage() {
  return (
    <div className="min-h-screen section-ivory flex flex-col justify-between pt-16 md:pt-20">
      {/* ── Main Journeys Section ──────────────────────────── */}
      <main>
        <JourneysSection />
      </main>

      {/* ── Persistent Footer ───────────────────────────────── */}
      <HomeFooter />
    </div>
  );
}

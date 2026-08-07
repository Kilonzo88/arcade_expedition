import Image from "next/image";
import Link from "next/link";
import { journeys } from "@/lib/journeys-data";

export default function JourneysSection() {
  return (
    <section className="section-ivory py-8 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Section Header ─────────────────────────────────── */}
        <header className="mb-6 md:mb-8 text-center">
          <h2 className="font-display italic text-3xl md:text-5xl text-[#16140F] mb-1.5">
            Our Journeys
          </h2>
          <p className="font-sans text-[12px] text-[#8a7a5f]">
            Different ecosystems guaranteed to make you fall in love with Africa.
          </p>
        </header>

        {/* ── Card Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {journeys.map((journey) => (
            <Link
              key={journey.slug}
              href={`/journeys/${journey.slug}`}
              className="group block flex flex-col justify-between"
            >
              <div>
                {/* Image container — 8:5 aspect ratio */}
                <div className="relative w-full aspect-[8/5] rounded-[6px] overflow-hidden bg-black/5">
                  <Image
                    src={journey.listingImage}
                    alt={journey.listingImageAlt}
                    fill
                    sizes="(min-width: 768px) 380px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Bottom scrim gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent 65%)",
                    }}
                  />

                  {/* Duration tag inside image (bottom-left) */}
                  <span
                    className="absolute bottom-3 left-3 md:bottom-3.5 md:left-3.5 z-10 font-mono text-[10px] uppercase tracking-[0.06em]"
                    style={{ color: "#C89A4B" }}
                  >
                    {journey.duration}
                  </span>
                </div>

                {/* Card text details */}
                <div className="mt-3.5 md:mt-4">
                  <h3 className="font-display italic text-[18px] md:text-[20px] text-[#16140F] mb-1.5 leading-snug">
                    {journey.title}
                  </h3>
                  <p className="font-sans text-[12.5px] text-[#8a7a5f] leading-[1.5] line-clamp-3 mb-4">
                    {journey.tagline}
                  </p>
                </div>
              </div>

              {/* Price + CTA row */}
              <div className="flex items-center justify-between pt-1 mt-auto">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.06em]"
                  style={{ color: "#C89A4B" }}
                >
                  FROM ${journey.pricing.startingFrom.toLocaleString()} PP
                </span>
                <span
                  className="font-sans text-[12px] transition-opacity group-hover:opacity-80"
                  style={{
                    color: "#C89A4B",
                    borderBottom: "1px solid #C89A4B",
                    paddingBottom: "1px",
                  }}
                >
                  View Journey &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

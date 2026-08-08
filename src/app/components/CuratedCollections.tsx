"use client";

import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { journeys } from "@/lib/journeys-data";

export default function CuratedCollections() {
  const autoplayRef = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [autoplayRef.current]
  );

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) autoplayRef.current.stop();
  }, []);

  return (
    <section className="section-ivory pt-10 pb-0">
      {/* ── Section header — contained ─────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-6">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-brass-gold mb-2.5">
          CURATED COLLECTIONS
        </p>
        <h2 className="font-display italic text-2xl md:text-[34px] leading-tight text-dark mb-6">
          Different Journeys, One Standard
        </h2>
        {/* Brass gold divider */}
        <div
          style={{
            width: "44px",
            height: "1px",
            backgroundColor: "var(--brass-gold)",
            margin: "0 auto",
          }}
        />
      </div>

      {/* ── Carousel track — full-bleed on mobile, contained on desktop ───────────────────── */}
      <div className="embla pb-4" ref={emblaRef}>
        <div className="embla__container">
          {journeys.map((journey) => (
            <div
              key={journey.slug}
              // Responsive slide width — mobile: 220px, desktop: roughly 32% to fill 1200px perfectly
              className="embla__slide flex-[0_0_220px] md:flex-[0_0_32%]"
            >
              <Link href={`/journeys/${journey.slug}`} style={{ display: "block" }}>
                {/* Responsive card height */}
                <div
                  className="card-scrim h-[340px] md:h-[500px]"
                  style={{
                    position: "relative",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={journey.image}
                    alt={journey.imageAlt}
                    fill
                    sizes="(min-width: 768px) 300px, 220px"
                    style={{ objectFit: "cover" }}
                    priority={journey.slug === "namibia"}
                  />

                  {/* Text cluster — bottom-anchored */}
                  <div className="absolute bottom-[14px] left-[14px] right-[14px] md:bottom-6 md:left-6 md:right-6 z-10">
                    <p className="font-mono text-[9.5px] md:text-[11px] text-brass-gold tracking-[0.06em] mb-1.5 md:mb-2">
                      {journey.meta}
                    </p>
                    <p className="font-display italic text-[19px] md:text-2xl leading-[1.2] text-ivory mb-3 md:mb-4">
                      {journey.carouselTitle || journey.title}
                    </p>
                    <span className="inline-block text-[11px] md:text-[13px] text-ivory border border-white/70 px-[14px] py-[7px] md:px-[18px] md:py-[8px] rounded-[2px] tracking-[0.04em]">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── View All Journeys CTA ────────────────────────────── */}
      <div className="mt-8 pb-10 max-w-[1200px] mx-auto px-6 md:px-12 flex justify-center">
        <Link
          href="/journeys"
          className="block w-full md:w-auto md:min-w-[280px] text-center transition-opacity hover:opacity-90"
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
    </section>
  );
}

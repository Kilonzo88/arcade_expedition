"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

/* ─── Slide data ────────────────────────────────────────── */
const slides = [
  {
    label: "ETOSHA NATIONAL PARK",
    coords: "18°50'S 16°20'E",
    desktop: "/etosha-desktop.avif",
    mobile: "/etosha-mobile.avif",
  },
  {
    label: "SOSSUSVLEI",
    coords: "24°44'S 15°41'E",
    desktop: "/sossulvei-desktop.avif",
    mobile: "/sossulvei-mobile.avif",
  },
  {
    label: "SKELETON COAST",
    coords: "20°00'S 13°10'E",
    desktop: "/skeleton-coast-desktop.avif",
    mobile: "/skeleton-coast-mobile.avif",
  },
];

/* ─── Accommodation data ────────────────────────────────── */
const accommodations = [
  {
    name: "Wilderness Kulala Desert Lodge",
    tag: "SOSSUSVLEI",
    image: "/kulala-desert-lodge.avif",
  },
  {
    name: "Shipwreck Lodge",
    tag: "SKELETON COAST",
    image: "/shipwreck-lodge.avif",
  },
  {
    name: "Onguma The Fort",
    tag: "ETOSHA",
    image: "/onguma-the-fort.avif",
  },
];

/* ─── Highlights data ───────────────────────────────────── */
const highlights = [
  {
    num: "01",
    title: "Sossusvlei & Deadvlei",
    desc: "Witness the iconic, towering red sand dunes of Sossusvlei, some of the highest in the world, reaching heights of up to 300 meters. Climb the legendary Dune 45 for a sunrise view that will forever be etched in your memory.",
  },
  {
    num: "02",
    title: "The Skeleton Coast",
    desc: "Fly to the remote and legendary Skeleton Coast, a windswept landscape of towering dunes meeting the Atlantic Ocean. Stay at a unique lodge that captures the spirit of this dramatic coastline.",
  },
  {
    num: "03",
    title: "Desert-Adapted Wildlife",
    desc: "Travel inland to the Hoanib Valley, a raw desert environment where you will witness the incredible spectacle of desert-adapted elephants, rhinos, and lions that have uniquely evolved to survive in this harsh environment.",
  },
  {
    num: "04",
    title: "Etosha National Park",
    desc: "Conclude your journey at a luxurious base on the edge of Etosha National Park. Game drives around its vast salt pan reveal a breathtaking concentration of wildlife, including black-maned Kalahari lions, rhinos, and large herds of elephants and zebras gathering at waterholes.",
  },
  {
    num: "05",
    title: "Adventure & Culture",
    desc: "In Swakopmund, Namibia\u2019s adventure capital, enjoy optional activities like quad biking and sandboarding, or explore the charming German-colonial streets and boutiques. Discover ancient San (Bushman) rock engravings at Twyfelfontein.",
  },
];

export default function NamibiaPage() {
  /* ── Hero slideshow state ──────────────────────── */
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const advance = useCallback(() => {
    setTransitioning(true);
    setPrevIdx(activeIdx);
    setActiveIdx((prev) => (prev + 1) % slides.length);
    setTimeout(() => {
      setPrevIdx(null);
      setTransitioning(false);
    }, 1200);
  }, [activeIdx]);

  useEffect(() => {
    const id = setInterval(advance, 5500);
    return () => clearInterval(id);
  }, [advance]);

  const current = slides[activeIdx];

  return (
    <>
      {/* ═══════════════ HERO ═══════════════════════════════════ */}
      <section className="relative w-full h-dvh overflow-hidden bg-[#16140F]">
        {/* ── Image layers ──────────────────────────────── */}
        {slides.map((slide, idx) => {
          const isActive = idx === activeIdx;
          const isPrev = idx === prevIdx;
          const show = isActive || isPrev;
          return (
            <div
              key={slide.label}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                opacity: show ? (isActive ? 1 : isPrev ? 0 : 0) : 0,
                transitionDuration: "1200ms",
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              {/* Desktop */}
              <Image
                src={slide.desktop}
                alt={slide.label}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover hidden md:block"
                style={{
                  filter: "brightness(0.75) contrast(1.05) saturate(0.95)",
                }}
              />
              {/* Mobile */}
              <Image
                src={slide.mobile}
                alt={slide.label}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover md:hidden"
                style={{
                  filter: "brightness(0.75) contrast(1.05) saturate(0.95)",
                }}
              />
            </div>
          );
        })}

        {/* ── Bottom scrim ──────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 20%, transparent 60%)",
          }}
        />

        {/* ── Hero copy ─────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-[4] pb-12 md:pb-16 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            {/* Coordinate tag */}
            <p
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] mb-1.5"
              style={{
                color: "#C89A4B",
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
              }}
            >
              <ScrambleText text={current.coords} trigger={activeIdx} />
            </p>

            {/* Location label */}
            <p
              className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.15em] mb-3"
              style={{
                color: "#C89A4B",
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
              }}
            >
              <span
                className="inline-block transition-opacity duration-500"
                key={current.label}
              >
                {current.label}
              </span>
            </p>

            {/* Title */}
            <h1
              className="font-display italic text-[38px] md:text-[56px] leading-[1.1] mb-3"
              style={{
                color: "#F3ECDD",
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
              }}
            >
              Namibia
            </h1>

            {/* Pull-quote */}
            <p
              className="font-sans italic text-[13px] md:text-[14px] max-w-[520px] leading-[1.6]"
              style={{ color: "#d8cdb8" }}
            >
              &ldquo;A journey through an otherworldly landscape of surreal
              beauty, from towering dunes to a wild, untamed coast.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ KEY FACTS ══════════════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-[rgba(22,20,15,0.1)] py-5 md:py-6">
            {[
              { value: "10/9", label: "Days / Nights" },
              { value: "$13,200", label: "From, per person" },
              { value: "5", label: "Highlights" },
            ].map((item, i) => (
              <div key={i} className="text-center px-2">
                <p
                  className="font-display italic text-[15px] md:text-[16px]"
                  style={{ color: "#16140F" }}
                >
                  {item.value}
                </p>
                <p
                  className="font-sans uppercase text-[9px] tracking-[0.07em] mt-0.5"
                  style={{ color: "#8a7a5f" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INTRO ══════════════════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 md:py-12">
          <p
            className="font-sans text-[13px] leading-[1.7] max-w-[720px]"
            style={{ color: "#5b5140" }}
          >
            For the intrepid explorer with a taste for the extraordinary,
            Namibia is a revelation. This itinerary is a journey through a
            photographer&rsquo;s paradise, where the stark beauty of the
            desert meets the raw power of the Atlantic. The seamless blend of
            fly-in and road safaris ensures you experience the vastness and
            diversity of this incredible country in total luxury.
          </p>
        </div>
      </section>

      {/* ═══════════════ JOURNEY HIGHLIGHTS ═════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-10 md:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {highlights.map((h) => (
              <div key={h.num}>
                <span
                  className="font-mono text-[13px] md:text-[14px] block mb-1"
                  style={{ color: "#C89A4B" }}
                >
                  {h.num}
                </span>
                <h3
                  className="font-sans font-semibold text-[14px] md:text-[15px] mb-1.5"
                  style={{ color: "#16140F" }}
                >
                  {h.title}
                </h3>
                <p
                  className="font-sans text-[12px] md:text-[13px] leading-[1.6]"
                  style={{ color: "#5b5140" }}
                >
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHERE YOU'LL STAY ══════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-10 md:pb-14">
          <p
            className="font-sans text-[11px] uppercase tracking-[0.15em] mb-4"
            style={{ color: "#8a7a5f" }}
          >
            Where You&rsquo;ll Stay
          </p>

          {/* Horizontal scroll track */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" as any }}
          >
            {accommodations.map((lodge) => (
              <div
                key={lodge.name}
                className="relative flex-shrink-0 rounded-[6px] overflow-hidden snap-start"
                style={{ width: 150, height: 190 }}
              >
                <Image
                  src={lodge.image}
                  alt={lodge.name}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                {/* Scrim */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent 65%)",
                  }}
                />
                {/* Text */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <p
                    className="font-display italic text-[13px] leading-snug"
                    style={{ color: "#F3ECDD" }}
                  >
                    {lodge.name}
                  </p>
                  <p
                    className="font-mono text-[8.5px] uppercase tracking-[0.06em] mt-0.5"
                    style={{ color: "#C89A4B" }}
                  >
                    {lodge.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING PANEL ══════════════════════════ */}
      <section style={{ backgroundColor: "#16140F" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Label */}
          <p
            className="font-sans text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: "#B8A488" }}
          >
            Starting From
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span
              className="font-display italic text-[28px] md:text-[34px]"
              style={{ color: "#F3ECDD" }}
            >
              $13,200
            </span>
            <span
              className="font-sans text-[12px]"
              style={{ color: "#d8cdb8" }}
            >
              per person
            </span>
          </div>

          {/* Inclusions */}
          <ul className="space-y-0 mb-10">
            {[
              "Internal flights",
              "All accommodation & full-board meals",
              "All activities and park fees",
              "Private 4x4 safari vehicle",
            ].map((item, i) => (
              <li
                key={i}
                className="font-sans text-[11.5px] md:text-[12.5px] py-3"
                style={{
                  color: "#d8cdb8",
                  borderBottom: "1px solid rgba(243,236,221,0.08)",
                }}
              >
                — {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/contact?journey=namibia"
            className="inline-block font-sans font-medium text-[13px] px-6 py-3 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#C89A4B",
              color: "#16140F",
              borderRadius: "2px",
            }}
          >
            Enquire About This Journey
          </Link>
        </div>
      </section>

      {/* ═══════════════ CLOSING BANNER ═════════════════════════ */}
      <section style={{ backgroundColor: "#16140F" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14 md:py-20 text-center">
          <h2
            className="font-display italic text-[26px] md:text-[36px] mb-6"
            style={{ color: "#F3ECDD" }}
          >
            Let us craft your legend.
          </h2>
          <Link
            href="/contact"
            className="inline-block font-sans font-medium text-[13px] px-6 py-3 transition-opacity hover:opacity-90"
            style={{
              border: "1px solid #C89A4B",
              color: "#F3ECDD",
              borderRadius: "2px",
            }}
          >
            Contact Arcane Expeditions
          </Link>
        </div>
      </section>
    </>
  );
}

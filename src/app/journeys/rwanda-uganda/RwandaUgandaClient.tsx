"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

/* ─── Slide data ────────────────────────────────────────── */
const slides = [
  {
    label: "VOLCANOES NATIONAL PARK",
    coords: "01°16'S 29°43'E",
    desktop: "/vuringa-volcanoes-desktop.avif",
    mobile: "/vuringa-volcanoes-mobile.avif",
  },
  {
    label: "BWINDI IMPENETRABLE FOREST",
    coords: "01°04'S 29°40'E",
    desktop: "/silverback-desktop.avif",
    mobile: "/silverback-mobile.avif",
  },
  {
    label: "KIGALI",
    coords: "01°57'S 30°04'E",
    desktop: "/kigali-memorial-desktop.avif",
    mobile: "/kigali-memorial-mobile.avif",
  },
];

/* ─── Accommodation data ────────────────────────────────── */
const accommodations = [
  {
    name: "Hotel des Mille Collines",
    tag: "KIGALI",
    image: "/hotel-des-mille.avif",
  },
  {
    name: "Gorilla Heights Lodge",
    tag: "BWINDI",
    image: "/gorilla-height-lodge.avif",
  },
  {
    name: "Sanctuary Gorilla Forest Camp",
    tag: "BWINDI",
    image: "/uganda-bwindi-sactuary-gorilla-forest-camp.avif",
  },
];

/* ─── Highlights data ───────────────────────────────────── */
const highlights = [
  {
    num: "01",
    title: "The Silverback Encounter",
    desc: "The undisputed highlight is a guided trek to spend a life-changing hour with a habituated family of Mountain Gorillas in the Bwindi Impenetrable Forest or Volcanoes National Park. Trekking permits, strictly limited to 96 per day, are secured in advance for you.",
  },
  {
    num: "02",
    title: "Behind the Scenes with Gorilla Doctors",
    desc: "Experience an exclusive, behind-the-scenes talk with a field veterinarian from The Gorilla Doctors. Discover how they are saving the species, one gorilla patient at a time.",
  },
  {
    num: "03",
    title: "Cultural Immersion",
    desc: "Walk the Buniga Cultural Trail with the indigenous Batwa people as they share their traditional survival skills, from foraging to fire-making. Visit the Iby'Iwacu Cultural Village, where former poachers now share traditional Rwandan medicine and warrior dances.",
  },
  {
    num: "04",
    title: "Kigali's Resilience",
    desc: "Your journey includes a poignant and essential visit to the Kigali Genocide Memorial Centre, providing a deeper understanding of the country's tragic past and its journey of remarkable resilience and unity.",
  },
  {
    num: "05",
    title: "Spectacular Scenery",
    desc: "Enjoy breathtaking views of the Virunga Volcanoes and a boat cruise on the tranquil twin lakes of Burera and Ruhondo.",
  },
];

export default function RwandaUgandaPage() {
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
              className="font-display italic text-[34px] md:text-[56px] leading-[1.1] mb-3"
              style={{
                color: "#F3ECDD",
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
              }}
            >
              Rwanda &amp; Uganda
            </h1>

            {/* Pull-quote */}
            <p
              className="font-sans italic text-[13px] md:text-[14px] max-w-[520px] leading-[1.6]"
              style={{ color: "#d8cdb8" }}
            >
              &ldquo;An intimate pilgrimage into the misty mountains to connect with the gentle giants of the forest.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ KEY FACTS ══════════════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-[rgba(22,20,15,0.1)] py-5 md:py-6">
            {[
              { value: "8/7", label: "Days / Nights" },
              { value: "$10,500", label: "From, per person" },
              { value: "96", label: "Daily Trekking Permits" },
            ].map((item, i) => (
              <div key={i} className="text-center px-1 md:px-2">
                <p
                  className="font-display italic text-[15px] md:text-[16px]"
                  style={{ color: "#16140F" }}
                >
                  {item.value}
                </p>
                <p
                  className="font-sans uppercase text-[8.5px] md:text-[9px] tracking-[0.07em] mt-0.5 leading-snug"
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
            For the discerning traveller seeking a deeper, more profound connection,
            this itinerary offers an encounter with one of nature&apos;s most
            extraordinary creatures: the mountain gorilla. This journey to the &ldquo;Land
            of a Thousand Hills&rdquo; combines poignant history with the ultimate
            bucket-list wildlife experience. It begins in the heart of Rwanda&apos;s
            vibrant capital before venturing into the emerald jungles of Uganda.
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
              $10,500
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
              "Airport transfers",
              "Accommodation & full-board meals",
              "All activities including a gorilla trekking permit",
              "Private 4x4 vehicle",
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
            href="/contact?journey=rwanda-uganda"
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

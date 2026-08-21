"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

/* ─── Slide data ────────────────────────────────────────── */
const slides = [
  {
    label: "SERENGETI",
    coords: "02°09'S 34°45'E",
    desktop: "/Serengeti-desktop.avif",
    mobile: "/Serengeti-mobile.avif",
  },
  {
    label: "MAASAI MARA",
    coords: "01°30'S 35°08'E",
    desktop: "/maasai-mara-desktop.avif",
    mobile: "/maasai-mara-mobile.avif",
  },
  {
    label: "NGORONGORO CRATER",
    coords: "03°12'S 35°35'E",
    desktop: "/ngorongoro-desktop.avif",
    mobile: "/ngorongor-mobile.avif",
  },
];

/* ─── Accommodation data ────────────────────────────────── */
const accommodations = [
  {
    name: "Sanctuary Swala",
    tag: "TARANGIRE",
    image: "/sanctuary-swala.avif",
  },
  {
    name: "Four Seasons Safari Lodge",
    tag: "SERENGETI",
    image: "/gibb's-farm.jpeg",
  },
  {
    name: "Sanctuary Olonana",
    tag: "MASAI MARA",
    image: "/sanctuary-olonana.avif",
  },
];

/* ─── Highlights data ───────────────────────────────────── */
const highlights = [
  {
    num: "01",
    title: "Exclusive Game Viewing",
    desc: "Explore the wildlife-rich Amboseli National Park at the foot of Mount Kilimanjaro, famous for its large elephant herds and views of the highest freestanding mountain in the world. Enjoy morning and afternoon game drives from a safari vehicle that seats just six, guaranteeing every guest a window seat.",
  },
  {
    num: "02",
    title: "The Ngorongoro Crater",
    desc: "Descend into the \u201cLost World\u201d of the Ngorongoro Crater, a natural amphitheatre where the Big Five roam freely on the floor of an ancient volcanic caldera. Stay at an ideally located camp that allows you to descend ahead of most visitors, catching the resident wildlife at its most active.",
  },
  {
    num: "03",
    title: "The Serengeti",
    desc: "Fly to the fabled Serengeti National Park, one of the oldest and least-changed ecosystems on Earth. During certain times of the year, you will witness the breathtaking spectacle of the annual wildebeest migration, where over a million animals trek in search of fresh grazing.",
  },
  {
    num: "04",
    title: "The Masai Mara",
    desc: "Conclude your journey in Kenya\u2019s Maasai Mara, the crown jewel of East African reserves. Stay at a Sanctuary Retreat on a private stretch of the Mara River, and enjoy a Scenic Sundowner followed by an elegant dinner.",
  },
  {
    num: "05",
    title: "Cultural Immersion",
    desc: "Meet with the Maasai tribesmen and learn about their traditional, nomadic lifestyle and their coexistence with wildlife. Visit a local village and primary school supported by philanthropy projects.",
  },
  {
    num: "06",
    title: "Exclusive Dining",
    desc: "Savor an intimate bush lunch, a hallmark of true luxury safaris, with fine food and drink as the symphony of the wild surrounds you.",
  },
];

export default function KenyaTanzaniaPage() {
  /* ── Hero slideshow state ──────────────────────── */
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const advance = useCallback(() => {
    setTransitioning(true);
    setPrevIdx(activeIdx);
    setActiveIdx((prev) => (prev + 1) % slides.length);
    // After crossfade completes, clear the previous slide
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
              Kenya &amp; Tanzania
            </h1>

            {/* Pull-quote */}
            <p
              className="font-sans italic text-[13px] md:text-[14px] max-w-[520px] leading-[1.6]"
              style={{ color: "#d8cdb8" }}
            >
              &ldquo;Witness the world&rsquo;s greatest wildlife spectacle
              from the heart of the most exclusive private reserves.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ KEY FACTS ══════════════════════════════ */}
      <section style={{ backgroundColor: "#F3ECDD" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 divide-x divide-[rgba(22,20,15,0.1)] py-5 md:py-6">
            {[
              { value: "12/11", label: "Days / Nights" },
              { value: "$22,490", label: "From, per person" },
              { value: "4", label: "Ecosystems" },
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
            This is the quintessential luxury safari, designed for the
            connoisseur. Experience the raw power and beauty of East Africa
            across four distinct ecosystems, culminating in an intimate
            encounter with the Great Migration. This journey is defined by
            seamless, light-aircraft transfers between camps, ensuring you
            spend your time on safari, not in transit.
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
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
              $22,490
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
              "Domestic flights",
              "Accommodation & full-board meals",
              "Unlimited game drives, park fees & 24/7 support",
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
            href="/contact?journey=kenya-tanzania"
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

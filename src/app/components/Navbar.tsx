"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isNonHero = pathname !== "/";
  const isSolid = scrolled || isNonHero;

  useEffect(() => {
    if (isNonHero) return;
    const onScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isNonHero]);

  return (
    <>
      {/* ── Fixed header shell ──────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSolid ? "bg-[#16140F]" : "bg-transparent"
        }`}
      >
        {/* Gradient scrim — fades out once scrolled */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 pointer-events-none transition-opacity duration-500 ${
            isSolid ? "opacity-0" : "opacity-100"
          }`}
          style={{
            height: "15vh",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, transparent 100%)",
          }}
        />

        {/* ── Nav grid: email | logo | hamburger ────────────── */}
        <nav className="relative grid grid-cols-3 items-center h-16 md:h-20 px-4 md:px-8">

          {/* Left — email icon */}
          <div className="justify-self-start">
            <a
              href="mailto:hello@arcaneexpeditions.com?subject=Safari%20Enquiry"
              aria-label="Email us about a safari enquiry"
              className={`
                flex items-center justify-center
                w-9 h-9 rounded-full
                border transition-all duration-200
                backdrop-blur-sm
                ${isSolid
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                  : scrolled
                  ? "border-dark/30 bg-dark/5 text-dark hover:bg-dark/10 hover:border-dark/60"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                }
              `}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path
                  d="M3 7l9 6 9-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Center — logo */}
          <div className="justify-self-center">
            <a href="/" aria-label="Arcane Expeditions home" className="flex items-center">
              <img
                src="/arcane-expeditions-logo.svg"
                alt="Arcane Expeditions"
                className="h-12 md:h-16 w-auto"
                style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }}
                fetchPriority="high"
                loading="eager"
              />
            </a>
          </div>

          {/* Right — hamburger */}
          <div className="justify-self-end">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`
                flex flex-col items-center justify-center gap-[5px]
                w-9 h-9
                rounded-full
                border transition-all duration-200
                backdrop-blur-sm
                cursor-pointer
                ${isSolid
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                  : scrolled
                  ? "border-dark/30 bg-dark/5 text-dark hover:bg-dark/10 hover:border-dark/60"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                }
              `}
            >
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-4 translate-y-[6.5px] rotate-45" : "w-4"
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-200 ${menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-4 -translate-y-[6.5px] -rotate-45" : "w-4"
                  }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Slide-down menu drawer ───────────────────────────── */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40
          pt-16 md:pt-20
          transition-all duration-300 ease-in-out
          backdrop-blur-md bg-black/80
          ${menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <nav className="flex flex-col items-center gap-6 py-10 text-white">
          {/* Plan Your Journey — first/most prominent */}
          <a
            href="/journeys"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-base tracking-widest uppercase text-white hover:text-white/70 transition-colors"
          >
            Plan Your Journey
          </a>
          <a
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-base tracking-widest uppercase text-white hover:text-white/70 transition-colors"
          >
            Our Story
          </a>
        </nav>
      </div>
    </>
  );
}
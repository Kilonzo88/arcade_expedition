"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Gradient scrim + navbar strip */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Gradient scrim: black/70 at very top → transparent at ~15% of viewport height */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0"
          style={{
            height: "15vh",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, transparent 100%)",
          }}
        />

        {/* Nav content sits inside the scrim */}
        <nav className="relative flex items-center justify-between px-6 md:px-16 pt-3 pb-2 pointer-events-auto">
          {/* Logo — left */}
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

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Inquire button */}
            <a
              href="#inquire"
              className="
                inline-flex items-center justify-center
                px-4 py-1.5
                text-xs font-semibold tracking-widest uppercase
                text-white
                border border-white/40
                rounded-full
                backdrop-blur-sm
                bg-white/10
                hover:bg-white/20 hover:border-white/70
                transition-all duration-200
                shadow-sm
              "
            >
              Inquire
            </a>

            {/* Hamburger toggle */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                flex flex-col items-center justify-center gap-[5px]
                w-9 h-9
                rounded-full
                border border-white/30
                backdrop-blur-sm
                bg-white/10
                hover:bg-white/20 hover:border-white/60
                transition-all duration-200
                cursor-pointer
              "
            >
              {/* Three bars that animate to X */}
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen
                  ? "w-4 translate-y-[6.5px] rotate-45"
                  : "w-4"
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-200 ${menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen
                  ? "w-4 -translate-y-[6.5px] -rotate-45"
                  : "w-4"
                  }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-down menu drawer (placeholder for later content) */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40
          pt-16
          transition-all duration-300 ease-in-out
          backdrop-blur-md bg-black/80
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <nav className="flex flex-col items-center gap-6 py-10 text-white">
          <p className="text-xs uppercase tracking-widest text-white/40">
            Menu coming soon
          </p>
        </nav>
      </div>
    </>
  );
}
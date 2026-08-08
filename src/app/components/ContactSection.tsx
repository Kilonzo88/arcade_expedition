"use client";

import React, { Suspense } from "react";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id = "contact" }: ContactSectionProps) {
  return (
    <section id={id} className="section-ivory py-12 md:py-20 text-center border-t border-[#16140F]/10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Section Header ─────────────────────────────────── */}
        <header className="max-w-[640px] mx-auto mb-8 md:mb-12">
          <p
            className="font-mono uppercase tracking-[0.08em] mb-2.5"
            style={{ fontSize: "11px", color: "var(--brass-gold)" }}
          >
            GET IN TOUCH
          </p>
          <h2
            className="font-display italic text-2xl md:text-4xl leading-tight text-[#16140F] mb-3"
          >
            Plan Your Journey
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#5b5140] leading-relaxed">
            Choose one of our journeys below, or tell us about the one only you can dream up.
          </p>
        </header>

        {/* ── Form ───────────────────────────────────────────── */}
        <Suspense fallback={<div className="text-center text-xs text-[#8a7a5f] py-8">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}

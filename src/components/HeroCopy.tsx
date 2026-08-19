import React from "react";

export function HeroCopy() {
  return (
    <div className="absolute left-6 right-6 top-[55%] bottom-auto md:left-16 md:right-auto md:top-auto md:bottom-16 md:max-w-xl z-20">
      <h1 className="font-cormorant italic font-medium text-4xl md:text-6xl leading-[1.15] text-luxury-cream mb-4">
        The wild,
        <br />
        without compromise
      </h1>

      <p className="font-sans text-sm md:text-base leading-relaxed text-luxury-tan mb-7 max-w-[26ch] md:max-w-[32ch]">
        End-to-end private safaris across Africa, arranged down to the
        last detail.
      </p>

      <a
        href="#contact"
        className="block w-full md:w-auto md:min-w-[280px] text-center transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--luxury-gold)",
          color: "var(--ivory)",
          borderRadius: "2px",
          padding: "16px",
          fontSize: "14px",
          textDecoration: "none",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.04em",
        }}
      >
        Plan Your Journey
      </a>
    </div>
  );
}

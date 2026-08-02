"use client";

import { Button } from "@/components/ui/button";

export function HeroCopy() {
  return (
    <div className="absolute left-6 right-6 top-[55%] bottom-auto md:left-16 md:right-auto md:top-auto md:bottom-16 md:max-w-xl z-20">
      <h1 className="font-cormorant italic font-medium text-4xl md:text-6xl leading-[1.15] text-luxury-cream mb-4">
        The wild,
        <br />
        without compromise
      </h1>

      <p className="font-sans text-sm md:text-base leading-relaxed text-luxury-tan mb-7 max-w-[26ch] md:max-w-[32ch]">
        End-to-end private safaris across East Africa, arranged down to the
        last detail.
      </p>

      <Button
        variant="outline"
        className="
          font-sans font-medium tracking-widest text-sm
          border border-luxury-gold rounded-full
          px-7 py-2.5
          bg-luxury-gold text-luxury-charcoal
          md:bg-transparent md:text-luxury-cream
          hover:bg-luxury-gold hover:text-luxury-charcoal
          transition-all duration-200
        "
      >
        Plan your journey
      </Button>
    </div>
  );
}

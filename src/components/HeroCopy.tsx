"use client";

import { Button } from "@/components/ui/button";

export function HeroCopy() {
  return (
    <div className="absolute left-6 right-6 top-[55%] bottom-auto md:left-16 md:right-auto md:top-auto md:bottom-16 md:max-w-xl z-20">
      <h1 className="font-display italic font-medium text-4xl md:text-6xl leading-[1.15] text-luxury-cream mb-4">
        The wild,
        <br />
        without compromise
      </h1>

      <p className="font-sans text-sm md:text-base leading-relaxed text-luxury-tan mb-7 max-w-[26ch] md:max-w-[32ch]">
        End-to-end private safaris across East Africa, arranged down to the
        last detail.
      </p>

      <Button
        size="lg"
        variant="outline"
        className="w-full md:w-auto font-sans font-medium border-luxury-gold text-luxury-cream bg-transparent hover:bg-luxury-gold hover:text-luxury-charcoal rounded-sm px-9 py-6 text-base"
      >
        Plan your journey
      </Button>
    </div>
  );
}

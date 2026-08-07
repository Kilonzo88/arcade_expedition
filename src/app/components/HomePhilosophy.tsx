export default function HomePhilosophy() {
  return (
    <section className="section-ivory pt-8 pb-10 text-center">
      {/* Eyebrow — centered and gold */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--brass-gold)",
          marginBottom: "12px",
        }}
      >
        OUR PHILOSOPHY
      </p>

      {/* Sub-headline */}
      <h3 className="font-sans font-semibold text-[18px] md:text-2xl text-dark mb-3 leading-[1.3] mx-auto">
        Every journey, tailored to one guest, not a group.
      </h3>

      {/* Body */}
      <p className="font-sans text-[13px] md:text-[15px] text-body-text leading-[1.65] max-w-[36ch] md:max-w-[48ch] mx-auto">
        No fixed itineraries. No shared vehicles. Just your pace, your camp,
        your Africa.
      </p>
    </section>
  );
}

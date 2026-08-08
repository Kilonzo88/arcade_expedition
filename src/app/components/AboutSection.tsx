const pillars = [
  {
    title: "Selective by design",
    body: "Three signature journeys, not three hundred. We\u2019d rather do a few extraordinarily well.",
  },
  {
    title: "Locally rooted",
    body: "Based in Nairobi, with direct relationships with every lodge and guide in our itineraries.",
  },
  {
    title: "Fully bespoke",
    body: "No shared vehicles, no fixed groups. Every itinerary is arranged around one traveller: you.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-ivory py-10 md:py-20 text-center">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Eyebrow ──────────────────────────────────────── */}
        <p
          className="font-mono uppercase tracking-[0.08em] mb-3"
          style={{ fontSize: "11px", color: "var(--brass-gold)" }}
        >
          NAIROBI, KENYA
        </p>

        {/* ── Headline ─────────────────────────────────────── */}
        <h2
          className="font-display italic text-3xl md:text-5xl leading-[1.25] mb-5 md:mb-7 mx-auto"
          style={{ color: "#16140F" }}
        >
          Built by people who&rsquo;ve walked&nbsp;it
        </h2>

        {/* ── Body paragraph ───────────────────────────────── */}
        <p
          className="max-w-[620px] mx-auto mb-10 md:mb-14"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "#5b5140",
            lineHeight: 1.65,
          }}
        >
          Arcane Expeditions was founded on a simple belief: safari should feel
          like being hosted, not herded. Every journey we offer, we&rsquo;ve
          built ourselves&nbsp;&mdash; walked the trails, stayed at the camps,
          met the guides&nbsp;&mdash; before we ever offer it to you.
        </p>

        {/* ── Value pillars ────────────────────────────────── */}
        <div
          className="max-w-[620px] mx-auto flex flex-col gap-5 text-center"
          style={{
            borderTop: "1px solid rgba(22,20,15,0.15)",
            paddingTop: "20px",
          }}
        >
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3
                className="mb-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#16140F",
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  color: "#5b5140",
                  lineHeight: 1.6,
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

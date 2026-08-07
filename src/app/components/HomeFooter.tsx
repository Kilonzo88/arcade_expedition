import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer
      className="section-ivory"
      style={{
        borderTop: "1px solid rgba(22,20,15,0.15)",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12"
        style={{
          paddingTop: "16px",
          paddingBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: copyright */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted-text)",
          }}
        >
          © Arcane Expeditions
        </span>

        {/* Right: social coordinate tags */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Link
            href="https://www.instagram.com/arcaneexpeditions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "var(--muted-text)",
              textDecoration: "none",
            }}
          >
            IG
          </Link>
          <Link
            href="https://www.facebook.com/arcaneexpeditions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "var(--muted-text)",
              textDecoration: "none",
            }}
          >
            FB
          </Link>
        </div>
      </div>
    </footer>
  );
}

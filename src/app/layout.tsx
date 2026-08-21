import type { Metadata } from "next";
import { Cormorant_Garamond, Orbitron, Outfit, Bodoni_Moda, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-display",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcaneexpeditions.com"),
  title: {
    default: "Arcane Expeditions | Bespoke Luxury Safaris, East Africa",
    template: "%s | Arcane Expeditions",
  },
  description:
    "End-to-end private safaris across Africa, arranged down to the last detail. Every journey, tailored to one guest, not a group. No fixed itineraries. No shared vehicles. Just your pace, your camp, your Africa.",
  openGraph: {
    title: "Arcane Expeditions | Bespoke Luxury Safaris, East Africa",
    description:
      "Fully bespoke luxury safaris across Namibia, Rwanda & Uganda, and Kenya & Tanzania — tailored to one guest, not a group. Let us craft your legend.",
    url: "https://arcaneexpeditions.com",
    siteName: "Arcane Expeditions",
    images: [{ url: "/luxury_safari.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcane Expeditions | Bespoke Luxury Safaris, East Africa",
    description:
      "Fully bespoke luxury safaris across Namibia, Rwanda & Uganda, and Kenya & Tanzania — tailored to one guest, not a group.",
    images: ["/luxury_safari.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${orbitron.variable} ${outfit.variable} ${bodoniModa.variable} ${instrumentSans.variable} ${plexMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col justify-start">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Arcane Expeditions",
              url: "https://arcaneexpeditions.com",
              logo: "https://arcaneexpeditions.com/arcane-expeditions-logo.svg",
              sameAs: [
                "https://www.instagram.com/arcaneexpeditions",
                "https://www.facebook.com/arcaneexpeditions",
                "https://www.linkedin.com/company/arcaneexpeditions",
              ],
            }),
          }}
        />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

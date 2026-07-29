import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcade Expeditions | Cosmic Retro Portal",
  description: "Embark on neon quest challenges across the galaxy. Coordinate your retro console gaming expeditions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${outfit.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col justify-start">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

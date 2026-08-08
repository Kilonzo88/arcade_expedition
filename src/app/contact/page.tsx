import ContactSection from "@/app/components/ContactSection";
import HomeFooter from "@/app/components/HomeFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Journey | Arcane Expeditions",
  description:
    "Choose one of our luxury signature journeys or contact us to design a bespoke safari tailored specifically to you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen section-ivory flex flex-col justify-between pt-16 md:pt-20">
      <main>
        <ContactSection id="contact-page" />
      </main>
      <HomeFooter />
    </div>
  );
}

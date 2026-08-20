import HomeFooter from "@/app/components/HomeFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Arcane Expeditions",
  description: "Privacy policy and data protection terms for Arcane Expeditions.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen section-ivory flex flex-col justify-between pt-24 md:pt-32">
      <main className="max-w-[800px] mx-auto px-6 md:px-12 py-12 text-[#16140F]">
        <h1 className="font-display italic text-3xl md:text-5xl mb-6 text-[#16140F]">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#8a7a5f] uppercase tracking-wider mb-8">
          Last updated: August 2026
        </p>

        <div className="space-y-6 font-sans text-sm md:text-base text-[#5b5140] leading-relaxed">
          <p>
            Arcane Expeditions respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you inquire about or book an expedition with us.
          </p>

          <h2 className="font-display text-xl text-[#16140F] pt-4">1. Information We Collect</h2>
          <p>
            When you submit an inquiry form or communicate with us via email or WhatsApp, we collect personal information such as your full name, email address, phone number, destination preferences, travel dates, and any custom requirements you provide.
          </p>

          <h2 className="font-display text-xl text-[#16140F] pt-4">2. How We Use Your Information</h2>
          <p>
            We use your information exclusively to craft, plan, and deliver bespoke luxury safari experiences, respond to inquiries within 24 hours, process bookings, and maintain contact regarding your journey. We do not sell or rent your data to third parties.
          </p>

          <h2 className="font-display text-xl text-[#16140F] pt-4">3. Data Protection & Security</h2>
          <p>
            We implement appropriate technical and organizational measures to ensure your personal data remains secure against unauthorized access, loss, or misuse.
          </p>

          <h2 className="font-display text-xl text-[#16140F] pt-4">4. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data updates, please contact us at{" "}
            <a href="mailto:info@arcaneexpeditions.com" className="text-[#C89A4B] underline">
              info@arcaneexpeditions.com
            </a>
            .
          </p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

"use server";
import { Resend } from "resend";
import { z } from "zod";


export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional().nullable(),
  journey: z.string().min(1, "Please select a journey of interest"),
  noExactDates: z.boolean().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  flexibleDatesText: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  company: z.string().optional().nullable(), // Honeypot field
  turnstileToken: z.string().optional().nullable(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const inquiryFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional().nullable(),
  journey: z.string().min(1, "Please select a journey of interest"),
  datesFlexible: z.boolean(),
  flexibleDatesText: z.string().optional().nullable(),
  dateRange: z.object({
    from: z.string().optional().nullable(),
    to: z.string().optional().nullable(),
  }).optional().nullable(),
  message: z.string().optional().nullable(),
  company: z.string().optional().nullable(), // Honeypot field
  turnstileToken: z.string().optional().nullable(),
});

export type InquiryFormData = z.infer<typeof inquiryFormSchema>;

// Helper to escape HTML characters to prevent injection
function escapeHtml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to format dates to "12 Jun 2027" format
function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "Not specified";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Not specified";
  const day = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export async function submitInquiry(data: InquiryFormData) {
  try {
    // 1. Re-validate server-side with the same zod schema used client-side
    const validated = inquiryFormSchema.parse(data);

    // 3. Check the honeypot field; if filled, return { success: true }
    //    without sending anything — don't tip off the bot
    if (validated.company && validated.company.trim() !== "") {
      console.log("[Honeypot Triggered] Silent redirection");
      return { success: true };
    }

    // 2. Verify the Turnstile token server-side against Cloudflare's API
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && validated.turnstileToken) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: validated.turnstileToken,
        }),
      });
      const verifyOutcome = await verifyRes.json();
      if (!verifyOutcome.success) {
        console.log("[Turnstile Verification Failed] Silent rejection");
        // Treat as failed honeypot check silently
        return { success: true };
      }
    }

    const dateText = validated.datesFlexible
      ? validated.flexibleDatesText ?? "Not specified"
      : validated.dateRange
        ? `${formatDate(validated.dateRange.from)} – ${formatDate(validated.dateRange.to)}`
        : "Not specified";

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Arcane Expeditions Website <inquiries@arcaneexpeditions.com>",
      to: "hello@arcaneexpeditions.com",
      replyTo: validated.email,
      subject: `New Inquiry: ${validated.journey} — ${validated.fullName}`,
      html: `
        <h2>New Journey Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(validated.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(validated.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(validated.phone ?? "Not provided")}</p>
        <p><strong>Journey:</strong> ${escapeHtml(validated.journey)}</p>
        <p><strong>Dates:</strong> ${escapeHtml(dateText)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(validated.message ?? "No message provided")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map((i) => i.message).join(", "),
      };
    }
    return {
      success: false,
      error: "Failed to send inquiry. Please try again or contact us directly.",
    };
  }
}

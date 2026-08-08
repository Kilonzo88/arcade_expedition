"use server";
// Next.js Server Action for Contact Form submission
import { Resend } from "resend";
import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  journey: z.string().min(1, "Please select a journey of interest"),
  noExactDates: z.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  flexibleDatesText: z.string().optional(),
  message: z.string().optional(),
  company: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // 1. Server-side re-validation
    const validated = contactFormSchema.parse(data);

    // 2. Honeypot check (silent rejection for spam bots)
    if (validated.company && validated.company.trim() !== "") {
      // Return success to the client without sending email (don't alert bot)
      return { success: true };
    }

    // 3. Prepare email content
    const resendApiKey = process.env.RESEND_API_KEY;

    let travelDatesInfo = "Not specified";
    if (validated.noExactDates) {
      travelDatesInfo = validated.flexibleDatesText
        ? `Flexible: ${validated.flexibleDatesText}`
        : "Flexible / No exact dates yet";
    } else if (validated.startDate || validated.endDate) {
      travelDatesInfo = `${validated.startDate || "N/A"} to ${validated.endDate || "N/A"}`;
    }

    const emailBody = `
New Safari Inquiry from Arcane Expeditions Website:

--------------------------------------------------
Full Name: ${validated.fullName}
Email: ${validated.email}
Phone / WhatsApp: ${validated.phone || "Not provided"}
Journey of Interest: ${validated.journey}
Preferred Travel Dates: ${travelDatesInfo}
--------------------------------------------------

Message:
${validated.message || "No additional message provided."}
    `.trim();

    // 4. Send email via Resend if API key is provided
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Arcane Expeditions Inquiry <hello@arcaneexpeditions.com>",
        to: ["hello@arcaneexpeditions.com"],
        subject: `New Safari Inquiry: ${validated.journey} - ${validated.fullName}`,
        text: emailBody,
        replyTo: validated.email,
      });
    } else {
      console.log("--------------------------------------------------");
      console.log("[Resend API Key missing - Logging inquiry locally]");
      console.log(emailBody);
      console.log("--------------------------------------------------");
    }

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

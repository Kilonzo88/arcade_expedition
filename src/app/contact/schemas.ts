// Shared Zod schemas and types — NOT a server file.
// Import from here in both client components and actions.ts.
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

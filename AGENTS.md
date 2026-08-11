# Send Inquiry — Submission Behavior Spec

Scope: only what happens when the Contact form's "Send Inquiry" button is
pressed. The form UI itself (fields, layout, styling, calendar picker) is
already built — this covers the two things that aren't: the Bespoke
Journey default, and the email backend.

---

## 1. Bespoke Journey — first option, default selection

The Journey of Interest dropdown's first option is
**"Bespoke Journey (Custom journey not listed)"** — styled identically to
the other three options, not deprioritized.

**Default behavior:** if the visitor arrived without a `?journey=` query
param, this option is selected by default (not blank). If they arrived via
`/contact?journey=namibia`, `?journey=rwanda-uganda`, or
`?journey=kenya-tanzania`, that matching package is pre-selected instead,
overriding the default.

---

## 2. Email mapping — the one rule that matters

**You cannot send an email "from" the visitor's own address** — this gets
spam-flagged as spoofing. The correct mapping:

- **From:** `Arcane Expeditions Website <inquiries@arcaneexpeditions.com>`
- **Reply-To:** the visitor's submitted email
- **To:** `hello@arcaneexpeditions.com`

Hitting Reply in the inbox goes straight to the visitor — this is what
makes it function as a real conversation despite the From address being
yours.

**Example — a filled form maps to this email:**
```
From:     Arcane Expeditions Website <inquiries@arcaneexpeditions.com>
Reply-To: sarah.whitfield@example.com
Subject:  New Inquiry: Namibia — Sarah Whitfield

New Journey Inquiry

Name:      Sarah Whitfield
Email:     sarah.whitfield@example.com
Phone:     +44 7911 123456
Journey:   Namibia
Dates:     12 Jun 2027 – 24 Jun 2027

Message:
"Celebrating our 10th anniversary, would love something
private including the Skeleton Coast."

—
Sent from the Plan Your Journey form on arcaneexpeditions.com
```
If Journey = Bespoke, that line reads
`Bespoke Journey (Custom journey not listed)` verbatim.

**No auto-reply to the visitor** — confirmed scope, one email only, sent
to the agency inbox. Do not add a second `resend.emails.send()` call for
a visitor-facing confirmation.

---

## 3. Server Action implementation

```ts
"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitInquiry(data: InquiryFormData) {
  // 1. Re-validate server-side with the same zod schema used client-side
  // 2. Verify the Turnstile token server-side against Cloudflare's API
  // 3. Check the honeypot field; if filled, return { success: true }
  //    without sending anything — don't tip off the bot

  const dateText = data.datesFlexible
    ? data.flexibleDatesText ?? "Not specified"
    : data.dateRange
      ? `${formatDate(data.dateRange.from)} – ${formatDate(data.dateRange.to)}`
      : "Not specified";

  await resend.emails.send({
    from: "Arcane Expeditions Website <inquiries@arcaneexpeditions.com>",
    to: "hello@arcaneexpeditions.com",
    replyTo: data.email,
    subject: `New Inquiry: ${data.journey} — ${data.fullName}`,
    html: `
      <h2>New Journey Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? "Not provided")}</p>
      <p><strong>Journey:</strong> ${escapeHtml(data.journey)}</p>
      <p><strong>Dates:</strong> ${escapeHtml(dateText)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(data.message ?? "No message provided")}</p>
    `,
  });

  return { success: true };
}
```

**Non-negotiable:** every field passes through `escapeHtml()` before
insertion into the email HTML — the message field is free text from a
stranger, unescaped it's an injection risk into the rendered email.

---

## 4. Setup required outside the code (not the agent's task — flag to
whoever has domain/account access)

- Resend account via the Vercel Marketplace integration (handles API key
  + DNS/domain verification in one flow, if deploying on Vercel)
- `RESEND_API_KEY` env variable
- Cloudflare Turnstile account — `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
  `TURNSTILE_SECRET_KEY` env variables
- Both `hello@arcaneexpeditions.com` (receiving) and
  `inquiries@arcaneexpeditions.com` (sending) fall under one domain
  verification — one setup step, not two
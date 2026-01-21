import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escape(s: string) {
  return (s || "").toString().trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS (чтобы с твоего домена работало)
  res.setHeader("Access-Control-Allow-Origin", "https://maxsharipov.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, date, venue, investment, vision } = req.body || {};

    const payload = {
      name: escape(name),
      email: escape(email),
      phone: escape(phone),
      date: escape(date),
      venue: escape(venue),
      investment: escape(investment),
      vision: escape(vision),
    };

    // простая валидация
    if (!payload.name || !payload.email || !payload.phone || !payload.date || !payload.venue || !payload.investment || !payload.vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Куда получать заявки:
    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) return res.status(500).json({ error: "CONTACT_TO_EMAIL is not set" });

    // FROM: сначала можно оставить resend.dev, потом заменим на твой домен
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Website Inquiry <onboarding@resend.dev>";

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New inquiry — ${payload.name} (${payload.investment})`,
      replyTo: payload.email,
      text:
        `New inquiry from maxsharipov.com\n\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        `Phone: ${payload.phone}\n` +
        `Wedding date: ${payload.date}\n` +
        `Venue: ${payload.venue}\n` +
        `Investment: ${payload.investment}\n\n` +
        `Vision:\n${payload.vision}\n`,
    });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}

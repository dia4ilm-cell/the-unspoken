import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "https://maxsharipov.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, date, venue, investment, vision } = req.body || {};

    if (!name || !email || !phone || !date || !venue || !investment || !vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) return res.status(500).json({ error: "CONTACT_TO_EMAIL is not set" });

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Website Inquiry <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New inquiry — ${name} (${investment})`,
      replyTo: email,
      text:
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nWedding date: ${date}\nVenue: ${venue}\nInvestment: ${investment}\n\nVision:\n${vision}\n`,
    });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}

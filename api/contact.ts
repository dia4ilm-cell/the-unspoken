import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, date, venue, investment, vision } = req.body || {};

    if (!name || !email || !phone || !date || !venue || !investment || !vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) return res.status(500).json({ error: "CONTACT_TO_EMAIL is not set" });

    const { data, error } = await resend.emails.send({
  from: "Sharipov Production <no-reply@mail.maxsharipov.com>",
  to: ["inquiry@maxsharipov.com"],
  replyTo: email,
  subject: `New inquiry — ${name} (${investment})`,
  text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Wedding date: ${date}
Venue: ${venue}
Investment: ${investment}

Vision:
${vision}
  `,
});

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: error.message || "Resend send failed" });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (e: any) {
    console.error("Server error:", e);
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}

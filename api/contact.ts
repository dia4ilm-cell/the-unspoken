
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      date,
      venue,
      investment,
      vision,
      turnstileToken,
    } = req.body || {};

    if (!name || !email || !phone || !date || !venue || !investment || !vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Cloudflare Turnstile protection
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    if (typeof turnstileToken !== "string" || !turnstileToken) {
      return res.status(400).json({ error: "Security verification required" });
    }

    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
        }),
      }
    );

    const verificationResult = await verification.json();

    if (
      !verification.ok ||
      !verificationResult.success ||
      !["maxsharipov.com", "www.maxsharipov.com"].includes(
        verificationResult.hostname
      )
    ) {
      return res.status(403).json({
        error: "Security verification failed. Please try again.",
      });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!toEmail) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Send inquiry to studio
    const { data, error } = await resend.emails.send({
      from: "Sharipov Production <no-reply@mail.maxsharipov.com>",
      to: [toEmail],
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
      return res.status(500).json({ error: "Email delivery failed" });
    }

    // Automatic confirmation email
    try {
      const safeName = String(name)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      const confirmation = await resend.emails.send({
        from: "Maksud Sharipov <no-reply@mail.maxsharipov.com>",
        to: [email],
        replyTo: "inquiry@maxsharipov.com",
        subject: "Thank you for your inquiry | The Unspoken",
        html: `
          <div style="background:#f5f2ed;padding:40px 20px;color:#292929;">
            <div style="max-width:560px;margin:auto;background:#ffffff;padding:40px;font-family:Georgia,serif;">

              <div style="text-align:center;letter-spacing:5px;font-size:24px;">
                THE UNSPOKEN
              </div>

              <p style="text-align:center;font-size:10px;letter-spacing:3px;">
                BY MAKSUD SHARIPOV
              </p>

              <hr style="border:0;border-top:1px solid #d8d2c8;margin:30px 0;">

              <h1 style="font-weight:normal;font-style:italic;text-align:center;font-size:30px;">
                Every story begins somewhere.
              </h1>

              <div style="font-size:16px;line-height:1.8;">
                <p>Dear ${safeName},</p>

                <p>Thank you for reaching out and sharing a glimpse into your upcoming celebration.</p>

                <p>It would be an honor to capture your story with intention, artistry, and authenticity.</p>

                <p>Your inquiry has been received, and I look forward to connecting with you personally within the next 48 hours.</p>

                <p>Warmly,<br>Maksud Sharipov</p>
              </div>

              <hr style="border:0;border-top:1px solid #d8d2c8;margin:30px 0;">

              <p style="text-align:center;font-size:11px;letter-spacing:3px;">
                WEDDING CINEMATOGRAPHY
              </p>

              <p style="text-align:center;">
                <a href="https://maxsharipov.com" style="color:#555555;">
                  maxsharipov.com
                </a>
              </p>

            </div>
          </div>
        `,
      });

      if (confirmation.error) {
        console.error("Confirmation error:", confirmation.error);
      }
    } catch (confirmationError) {
      console.error("Confirmation failed:", confirmationError);
    }

    return res.status(200).json({ ok: true, id: data?.id });

  } catch (e: any) {
    console.error("Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

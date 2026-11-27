
import React, { useState, useEffect, useRef } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    venue: "",
    investment: "",
    vision: "",
  });

  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [securityError, setSecurityError] = useState("");

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const renderWidget = () => {
      const turnstile = (window as any).turnstile;

      if (!active || !turnstile || !turnstileRef.current || widgetId.current !== null) {
        return;
      }

      const siteKey = (import.meta as any).env.VITE_TURNSTILE_SITE_KEY;

      if (!siteKey) {
        setSecurityError("Security verification is unavailable.");
        return;
      }

      widgetId.current = turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: "light",
        appearance: "interaction-only",

        callback: (token: string) => {
          if (active) {
            setTurnstileToken(token);
            setSecurityError("");
          }
        },

        "expired-callback": () => {
          if (active) setTurnstileToken("");
        },

        "error-callback": () => {
          if (active) {
            setTurnstileToken("");
            setSecurityError("Security verification failed. Please try again.");
          }
        },
      });
    };

    let script = document.getElementById("cloudflare-turnstile") as HTMLScriptElement | null;

    if ((window as any).turnstile) {
      renderWidget();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = "cloudflare-turnstile";
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderWidget);
        document.head.appendChild(script);
      } else {
        script.addEventListener("load", renderWidget);
      }
    }

    return () => {
      active = false;
      script?.removeEventListener("load", renderWidget);

      if (widgetId.current !== null && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken("");

    if (widgetId.current !== null && (window as any).turnstile) {
      (window as any).turnstile.reset(widgetId.current);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sending || submitted) return;

    if (!turnstileToken) {
      setSecurityError("Please complete the security verification.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Send failed:", data);
        alert("Sorry — your message was not sent. Please try again.");
        return;
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        venue: "",
        investment: "",
        vision: "",
      });

    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
      resetTurnstile();
    }
  };

  const investmentOptions = [
    "$15,000 - $20,000",
    "$20,000 - $30,000",
    "$30,000 - $50,000",
    "$50,000+",
  ];

  const inputClass =
    "w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20";

  const labelClass =
    "text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1";

  return (
    <div className="pt-40 pb-32 px-6 bg-white text-black min-h-screen">
      <div className="container mx-auto max-w-2xl fade-in">

        <header className="mb-16">
          <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">
            Inquire
          </span>

          <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">
            The <span className="italic">Connection</span>
          </h1>

          <p className="text-black/50 font-light leading-relaxed max-w-md uppercase tracking-widest text-[10px]">
            To ensure the highest quality of artistry, Maksud accepts a limited number of commissions per year. Please provide your details below.
          </p>
        </header>

        <div className={submitted ? "hidden" : ""}>

          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-2">
                <label className={labelClass}>Full Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="JEAN DOE"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Email Address</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="EMAIL@EXAMPLE.COM"
                  type="email"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-2">
                <label className={labelClass}>Phone Number</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+1 (000) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Wedding Date</label>
                <input
                  required
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="MM / DD / YYYY"
                />
              </div>

            </div>

            <div className="space-y-2">
              <label className={labelClass}>Venue & Location</label>
              <input
                required
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="E.G. VILLA D'ESTE, LAKE COMO"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Expected Investment</label>

              <select
                required
                name="investment"
                value={formData.investment}
                onChange={handleInputChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  SELECT RANGE
                </option>

                {investmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}

              </select>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Tell us your vision</label>

              <textarea
                required
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                className={`${inputClass} min-h-[150px] resize-none`}
                placeholder="SHARE A FEW DETAILS ABOUT YOUR DAY..."
              />
            </div>

            <div ref={turnstileRef}></div>

            {securityError && (
              <p className="text-xs text-red-700" role="alert">
                {securityError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending || !turnstileToken}
              className="group relative w-full overflow-hidden border border-black py-6 transition-all duration-700 disabled:opacity-50"
            >

              <span
                className={`relative z-10 text-[10px] tracking-[0.6em] uppercase font-bold transition-colors duration-500 ${
                  sending ? "text-black" : "group-hover:text-white"
                }`}
              >
                {sending
                  ? "Processing..."
                  : !turnstileToken
                  ? "Verifying..."
                  : "Submit Inquiry"}
              </span>

              {!sending && turnstileToken && (
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              )}

            </button>

          </form>
        </div>

        {submitted && (
          <div
            role="status"
            className="border border-black/10 bg-[#f5f2ed] px-8 py-16 md:px-16 text-center fade-in"
          >

            <span className="text-[10px] tracking-[0.5em] uppercase text-black/40">
              The Unspoken
            </span>

            <h2 className="font-serif italic text-4xl md:text-5xl mt-8 mb-8">
              Every story begins somewhere.
            </h2>

            <div className="w-12 h-px bg-black/20 mx-auto mb-8"></div>

            <p className="font-serif text-lg leading-relaxed text-black/70">
              Thank you for your inquiry. It would be an honor to tell your story.
            </p>

            <p className="font-serif text-lg leading-relaxed text-black/70 mt-4">
              I look forward to connecting with you personally within the next 48 hours.
            </p>

            <p className="font-serif italic mt-10">
              Warmly,
              <br />
              Maksud Sharipov
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from "react";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Send failed:", data);
        alert("Sorry — message was not sent. Please try again.");
        return;
      }

      alert("Thank you for your inquiry. Maksud will be in touch within 48 hours.");
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
    }
  };

  const investmentOptions = ["$15,000 - $20,000", "$20,000 - $30,000", "$30,000 - $50,000"];

  return (
    <div className="pt-24 pb-24 px-6 bg-white text-black">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Contact</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full border p-3" placeholder="Name" />
          <input required name="email" value={formData.email} onChange={handleInputChange} className="w-full border p-3" placeholder="Email" type="email" />
          <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border p-3" placeholder="Phone" />
          <input required name="date" value={formData.date} onChange={handleInputChange} className="w-full border p-3" placeholder="Wedding Date" />
          <input required name="venue" value={formData.venue} onChange={handleInputChange} className="w-full border p-3" placeholder="Venue & Location" />

          <select required name="investment" value={formData.investment} onChange={handleInputChange} className="w-full border p-3">
            <option value="" disabled>Select investment range</option>
            {investmentOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>

          <textarea required name="vision" value={formData.vision} onChange={handleInputChange} className="w-full border p-3" rows={5} placeholder="Your vision..." />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-black text-white py-4 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;


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

  const investmentOptions = ["$15,000 - $20,000", "$20,000 - $30,000", "$30,000 - $50,000", "$50,000+"];

  return (
    <div className="pt-40 pb-32 px-6 bg-white text-black min-h-screen">
      <div className="container mx-auto max-w-2xl fade-in">
        <header className="mb-16">
          <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">Inquire</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">The <span className="italic">Connection</span></h1>
          <p className="text-black/50 font-light leading-relaxed max-w-md uppercase tracking-widest text-[10px]">
            To ensure the highest quality of artistry, Maksud accepts a limited number of commissions per year. Please provide your details below.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Full Name</label>
              <input 
                required 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20" 
                placeholder="JEAN DOE" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Email Address</label>
              <input 
                required 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20" 
                placeholder="EMAIL@EXAMPLE.COM" 
                type="email" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Phone Number</label>
              <input 
                required 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20" 
                placeholder="+1 (000) 000-0000" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Wedding Date</label>
              <input 
                required 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20" 
                placeholder="MM / DD / YYYY" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Venue & Location</label>
            <input 
              required 
              name="venue" 
              value={formData.venue} 
              onChange={handleInputChange} 
              className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20" 
              placeholder="E.G. VILLA D'ESTE, LAKE COMO" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Expected Investment</label>
            <select 
              required 
              name="investment" 
              value={formData.investment} 
              onChange={handleInputChange} 
              className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 appearance-none"
            >
              <option value="" disabled>SELECT RANGE</option>
              {investmentOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-bold ml-1">Tell us your vision</label>
            <textarea 
              required 
              name="vision" 
              value={formData.vision} 
              onChange={handleInputChange} 
              className="w-full bg-white border border-black/10 p-4 text-xs tracking-wider focus:border-black outline-none transition-colors duration-500 placeholder:opacity-20 min-h-[150px] resize-none" 
              placeholder="SHARE A FEW DETAILS ABOUT YOUR DAY..." 
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="group relative w-full overflow-hidden border border-black py-6 transition-all duration-700 disabled:opacity-50"
          >
            <span className={`relative z-10 text-[10px] tracking-[0.6em] uppercase font-bold transition-colors duration-500 ${sending ? 'text-black' : 'group-hover:text-white'}`}>
              {sending ? "Processing..." : "Submit Inquiry"}
            </span>
            {!sending && (
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

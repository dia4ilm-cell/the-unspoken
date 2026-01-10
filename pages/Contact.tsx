
import React, { useState } from 'react';
import { getVisionAssistance } from '../services/geminiService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    investment: '',
    vision: '',
  });
  const [loadingVision, setLoadingVision] = useState(false);
  const [visionSuggestion, setVisionSuggestion] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVisionAssist = async () => {
    if (!formData.vision) return;
    setLoadingVision(true);
    const suggestion = await getVisionAssistance(formData.vision);
    if (suggestion) {
      setVisionSuggestion(suggestion);
    }
    setLoadingVision(false);
  };

  const applySuggestion = () => {
    if (visionSuggestion) {
      setFormData(prev => ({ ...prev, vision: visionSuggestion }));
      setVisionSuggestion(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Maksud will be in touch within 48 hours to discuss your cinematic legacy.");
  };

  const investmentOptions = [
    "$15,000 - $20,000",
    "$20,000 - $30,000",
    "$30,000 - $50,000"
  ];

  return (
    <div className="pt-40 pb-24 px-6 fade-in bg-white text-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">Inquire</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">Let's Create <span className="italic font-normal">History</span></h1>
            <p className="text-black/60 font-light leading-loose text-lg mb-16">
              I’d love to hear more about your celebration and how we can bring your vision to life.
            </p>
            
            <div className="space-y-10">
                <div>
                    <p className="text-[9px] tracking-[0.5em] uppercase text-black font-bold mb-2">Email</p>
                    <p className="text-2xl font-serif text-black">Sharipov.video@gmail.com</p>
                </div>
                <div>
                    <p className="text-[9px] tracking-[0.5em] uppercase text-black font-bold mb-2">Social</p>
                    <p className="text-2xl font-serif text-black">@maksud_sharipov</p>
                </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-20 border border-black/10">
            <form onSubmit={handleSubmit} className="space-y-12 text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Name *</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full bg-transparent outline-none py-1 placeholder:text-gray-300 font-light text-sm text-black"
                  />
                </div>
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Email Address *</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="hello@example.com" 
                    className="w-full bg-transparent outline-none py-1 placeholder:text-gray-300 font-light text-sm text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Phone Number *</label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder="+1 000 000 0000" 
                    className="w-full bg-transparent outline-none py-1 placeholder:text-gray-300 font-light text-sm text-black"
                  />
                </div>
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Wedding Date *</label>
                  <input 
                    required 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="MM/DD/YYYY" 
                    className="w-full bg-transparent outline-none py-1 placeholder:text-gray-300 font-light text-sm text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Venue & Location *</label>
                  <input 
                    required 
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="City, Country" 
                    className="w-full bg-transparent outline-none py-1 placeholder:text-gray-300 font-light text-sm text-black"
                  />
                </div>
                <div className="border-b border-black/10 py-3">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-3 block font-bold">Investment Range *</label>
                  <select 
                    required 
                    name="investment"
                    value={formData.investment}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none py-1 text-black font-light cursor-pointer appearance-none text-sm"
                  >
                    <option value="" disabled>Select Range</option>
                    {investmentOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="py-4">
                <label className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-4 block flex justify-between font-bold">
                  <span>Your Vision *</span>
                  <button 
                    type="button"
                    onClick={handleVisionAssist}
                    disabled={loadingVision || !formData.vision}
                    className="text-black hover:underline disabled:opacity-30 flex items-center gap-2 transition-all decoration-1 underline-offset-4"
                  >
                    {loadingVision ? (
                      <span className="animate-pulse">Refining...</span>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Artistic Assist
                      </>
                    )}
                  </button>
                </label>
                <textarea 
                  required
                  name="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="Describe your vision..." 
                  className="w-full bg-gray-50 border border-black/5 p-6 outline-none font-light placeholder:text-gray-300 focus:border-black/20 transition-colors text-sm text-black"
                ></textarea>
                
                {visionSuggestion && (
                  <div className="mt-8 p-6 bg-white border border-black text-black animate-fade-in">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-black/40 font-bold mb-4">Artistic Refinement:</p>
                    <p className="text-sm italic text-black/90 mb-6 leading-relaxed font-serif">{visionSuggestion}</p>
                    <button 
                        type="button"
                        onClick={applySuggestion}
                        className="text-[9px] uppercase tracking-[0.4em] bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors font-bold"
                    >
                        Apply this vision
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white py-6 uppercase tracking-[0.5em] text-[10px] hover:bg-white hover:text-black border border-black transition-all duration-700 font-bold"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

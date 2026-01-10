
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-40 pb-24 fade-in bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-full h-full border border-black/10 -z-10 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" 
              alt="Maksud Sharipov Portrait" 
              className="w-full aspect-[4/5] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 right-6 text-black text-right hidden md:block">
                <span className="font-signature text-4xl block">Maksud Sharipov</span>
                <span className="text-[10px] tracking-[0.4em] uppercase opacity-70">Founder & Director</span>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">The Artist</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Meet <span className="italic">Maksud</span></h1>
            
            <div className="space-y-8 text-black/70 font-light leading-loose text-lg">
              <p>
                My journey into cinematography didn’t begin with a technical manual, but with an old 8mm film camera discovered in my aunt’s attic. I was drawn to the way it captured light, grain, and the fleeting rhythm of family life.
              </p>
              <p>
                Shaped by encounters with different cultures and traditions, my work is guided by mood, nuance, and atmosphere — much like a finely crafted fragrance, where emotion is suggested rather than explained. Rooted in a background in fashion and fine art, my approach lives at the intersection of human emotion and cinematic aesthetics.
              </p>
              <p>
                I don’t simply document weddings — I curate experiences. I look for beauty in the quiet moments: the way a veil catches the wind, the tremor in a voice during vows, the unspoken connection felt in a room filled with people you love.
              </p>
            </div>
            
            <div className="mt-12">
              <p className="text-black font-medium text-xl md:text-2xl font-serif italic leading-relaxed border-l-2 border-black pl-8 py-2">
                "Each film is personally crafted by Maksud Sharipov, shaped across destinations worldwide."
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white border-t border-b border-black/10 py-32 px-12 -mx-6 md:mx-0">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
            <div>
              <span className="text-5xl font-serif text-black mb-8 block font-bold">01.</span>
              <h3 className="text-xs uppercase tracking-[0.4em] mb-6 font-bold">Discovery</h3>
              <p className="text-xs text-black/50 font-light leading-relaxed uppercase tracking-widest">
                We begin with a deep dive into your story, your aesthetic preferences, and the vision for your day.
              </p>
            </div>
            <div>
              <span className="text-5xl font-serif text-black mb-8 block font-bold">02.</span>
              <h3 className="text-xs uppercase tracking-[0.4em] mb-6 font-bold">Artistry</h3>
              <p className="text-xs text-black/50 font-light leading-relaxed uppercase tracking-widest">
                On the day, my team and I work discretely, observing and capturing with an editorial eye.
              </p>
            </div>
            <div>
              <span className="text-5xl font-serif text-black mb-8 block font-bold">03.</span>
              <h3 className="text-xs uppercase tracking-[0.4em] mb-6 font-bold">Alchemy</h3>
              <p className="text-xs text-black/50 font-light leading-relaxed uppercase tracking-widest">
                The edit is where the magic happens—crafting a narrative that feels like a classic film.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

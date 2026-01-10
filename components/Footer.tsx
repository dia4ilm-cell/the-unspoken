
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-12 md:py-16 border-t border-black/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif mb-4 tracking-[0.3em] uppercase font-bold text-black">SHARIPOV</h2>
        <p className="text-[9px] tracking-[0.4em] text-black/40 mb-10 uppercase font-light">International Wedding & Event Cinematography</p>
        
        <div className="flex justify-center space-x-8 mb-10">
          <a href="https://instagram.com/maksud_sharipov" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity tracking-[0.3em] text-[9px] uppercase font-medium">Instagram</a>
          <a href="https://vimeo.com/priorityfilm" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity tracking-[0.3em] text-[9px] uppercase font-medium">Vimeo</a>
        </div>
        
        <div className="pt-8 border-t border-black/5 text-[8px] tracking-[0.3em] text-black/30 uppercase">
          &copy; {new Date().getFullYear()} Sharipov Video Production. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

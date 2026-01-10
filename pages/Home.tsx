
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      <section className="relative h-screen w-full flex items-center justify-center bg-white px-6">
        <div className="relative z-10 text-center text-black">
          <span className="text-[10px] md:text-xs tracking-[1em] font-light uppercase opacity-40 block mb-8">
            International Wedding Cinematography
          </span>
          <h1 className="text-6xl md:text-9xl font-serif mb-8 tracking-[0.1em] uppercase font-bold text-black">
            Sharipov
          </h1>
          <p className="text-[10px] md:text-sm tracking-[0.6em] font-light uppercase opacity-60 max-w-xl mx-auto mb-16 leading-relaxed">
            Capturing the timeless essence of your most profound moments.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <Link 
              to="/portfolio" 
              className="group relative inline-block text-[10px] uppercase tracking-[0.5em] text-black font-bold"
            >
              <span className="relative z-10">The Portfolio</span>
              <span className="absolute bottom-[-8px] left-0 w-0 h-[1px] bg-black transition-all duration-700 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="group relative inline-block text-[10px] uppercase tracking-[0.5em] text-black font-bold"
            >
              <span className="relative z-10">Inquire Now</span>
              <span className="absolute bottom-[-8px] left-0 w-0 h-[1px] bg-black transition-all duration-700 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>
    </div>
  );
};

export default Home;

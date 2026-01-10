
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="fade-in">
      <section className="relative h-screen w-full flex items-center justify-center bg-white px-6">
        <div className="relative z-10 text-center text-black">
          <h1 className="text-7xl md:text-[11rem] font-serif mb-8 tracking-tighter leading-none select-none">
            The <br />
            <span className="italic font-normal">Unspoken</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20">
            <Link 
              to="/portfolio" 
              className="group relative inline-block uppercase text-black font-medium"
              style={{ letterSpacing: '0.35em', fontSize: '0.65rem' }}
            >
              <span className="relative z-10">Explore</span>
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


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Inquire', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-sm py-4 border-b border-black/10' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center text-black">
        <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase flex flex-col md:flex-row md:gap-3 items-center transition-colors duration-500">
          <span className="font-bold">Sharipov</span> 
          <span className="text-xs md:text-sm tracking-[0.4em] opacity-60 font-sans mt-1 md:mt-2">Cinematography</span>
        </Link>
        
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.4em] hover:opacity-100 transition-all duration-500 ${location.pathname === link.path ? 'opacity-100 font-bold border-b border-black pb-1' : 'opacity-40 font-light'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden text-black">
            <button className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

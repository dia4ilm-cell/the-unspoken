
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'ABOUT', path: '/about' },
    { name: 'INQUIRE', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-5 shadow-sm' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-10 flex justify-between items-center text-black">
          <Link to="/" className="flex items-baseline gap-3 group">
            <span className="text-xl md:text-2xl font-serif tracking-[0.3em] uppercase font-bold">Sharipov</span> 
            <span className="text-[8px] md:text-[9px] tracking-[0.6em] uppercase opacity-30 font-sans font-light">Production</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[9px] tracking-[0.4em] transition-all duration-500 hover:opacity-100 ${location.pathname === link.path ? 'opacity-100 font-bold' : 'opacity-30 font-light'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-[110] relative p-2"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-black transition-all mb-1.5 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[90] transition-transform duration-700 ease-in-out flex flex-col items-center justify-center space-y-12 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-4xl font-serif tracking-tight ${location.pathname === link.path ? 'italic underline underline-offset-8' : 'font-light opacity-50'}`}
          >
            {link.name}
          </Link>
        ))}
        <div className="pt-12 flex space-x-8 opacity-40">
           <a href="https://instagram.com/maksud_sharipov" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.3em] uppercase">Instagram</a>
           <a href="https://vimeo.com/priorityfilm" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.3em] uppercase">Vimeo</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;


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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Inquire', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-black">
          <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase flex flex-col md:flex-row md:gap-3 items-center">
            <span className="font-bold">Sharipov</span> 
            <span className="text-[10px] md:text-xs tracking-[0.5em] opacity-40 font-sans mt-1 md:mt-2">Production</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[9px] uppercase tracking-[0.5em] hover:opacity-100 transition-all duration-500 hover-scale ${location.pathname === link.path ? 'opacity-100 font-bold' : 'opacity-40 font-light'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-[110] relative p-2"
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
            className={`text-4xl font-serif tracking-tight ${location.pathname === link.path ? 'italic' : 'font-light opacity-50'}`}
          >
            {link.name}
          </Link>
        ))}
        <div className="pt-12 flex space-x-8 opacity-40">
           <a href="#" className="text-[10px] tracking-[0.3em] uppercase">Instagram</a>
           <a href="#" className="text-[10px] tracking-[0.3em] uppercase">Vimeo</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

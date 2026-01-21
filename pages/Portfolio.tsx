
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

  const closeLightbox = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // Attempt to enter native fullscreen
      if (lightboxRef.current && lightboxRef.current.requestFullscreen) {
        lightboxRef.current.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    } else {
      document.body.style.overflow = '';
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, closeLightbox]);

  // Listen for native fullscreen exit (e.g. via system ESC) to sync state
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [selectedVideo]);

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    const id = getVimeoId(url);
    // Added autoplay, background mode, and forced high quality parameters
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&badge=0` : url;
  };

  const getThumbnail = (item: PortfolioItem) => {
    const id = getVimeoId(item.videoUrl);
    return id ? `https://vumbnail.com/${id}.jpg` : 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000';
  };

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 fade-in bg-white text-black">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-16 md:mb-24">
          <span className="text-black/40 tracking-[0.5em] text-[9px] md:text-[10px] uppercase block mb-4 md:mb-6 font-bold">The Work</span>
          <h1 className="text-4xl md:text-8xl font-serif mb-6 leading-tight tracking-tighter">
            The <span className="italic">Portfolio</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {PORTFOLIO_DATA.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedVideo(item)}>
              <div className="relative overflow-hidden aspect-video mb-6 md:mb-8 bg-black shadow-sm">
                <img 
                  src={getThumbnail(item)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                       <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                </div>
              </div>
              <div className="flex justify-between items-start px-1 md:px-0">
                <div>
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-black/30 mb-2 md:mb-3 font-bold">{item.location} • {item.year}</p>
                  <h3 className="text-xl md:text-2xl font-serif">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-40 text-center">
          <a href={vimeoLibraryUrl} target="_blank" rel="noopener noreferrer" className="inline-block uppercase text-black border border-black px-8 md:px-12 py-4 md:py-5 hover:bg-black hover:text-white transition-all tracking-[0.3em] text-[9px] md:text-[10px] font-bold">
            Full Collection
          </a>
        </div>
      </div>

      {selectedVideo && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[9999] bg-black flex flex-col justify-center items-center"
        >
          {/* Top Bar - only visible when not in system fullscreen or revealed by mouse */}
          <div className="absolute top-0 w-full flex justify-between items-center p-6 md:p-10 z-10 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <span className="text-white text-xs md:text-sm font-serif tracking-[0.4em] uppercase font-bold">Sharipov Production</span>
            <button 
              onClick={closeLightbox} 
              className="text-white text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
            >
              Close
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full max-w-none">
              <div className="relative w-full h-full bg-black">
                <iframe 
                  src={getEmbedUrl(selectedVideo.videoUrl)} 
                  className="absolute inset-0 w-full h-full border-0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Fallback Close for Mobile (Floating Button) */}
          <button 
            onClick={closeLightbox}
            className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full text-[10px] tracking-[0.4em] uppercase font-bold"
          >
            Close Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

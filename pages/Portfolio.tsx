
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

  const closeLightbox = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
    }
    setSelectedVideo(null);
    setIsVideoLoading(true);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling on both body and html for total lock
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      loadingTimeoutRef.current = window.setTimeout(() => {
        setIsVideoLoading(false);
      }, 5000);

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (!isIOS && lightboxRef.current && lightboxRef.current.requestFullscreen) {
        lightboxRef.current.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedVideo, closeLightbox]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && selectedVideo) {
        closeLightbox();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [selectedVideo, closeLightbox]);

  const getVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    const id = getVimeoId(url);
    if (!id) return url;
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&playsinline=1&color=ffffff&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1`;
  };

  const getThumbnail = (item: PortfolioItem) => {
    const id = getVimeoId(item.videoUrl);
    return id ? `https://vumbnail.com/${id}.jpg` : 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000';
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* 
          IMPORTANT: The main content is wrapped in the animation, 
          but the Lightbox is a direct sibling to ensure 'fixed' 
          positioning works correctly over the entire viewport.
      */}
      <div className="pt-32 md:pt-40 pb-24 px-6 fade-in">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-16 md:mb-24 reveal">
            <span className="text-black/40 tracking-[0.5em] text-[9px] md:text-[10px] uppercase block mb-4 md:mb-6 font-bold">The Work</span>
            <h1 className="text-4xl md:text-8xl font-serif mb-6 leading-tight tracking-tighter">
              The <span className="italic">Portfolio</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {PORTFOLIO_DATA.map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer reveal" 
                onClick={() => setSelectedVideo(item)}
              >
                <div className="relative overflow-hidden aspect-video mb-6 md:mb-8 bg-neutral-100 shadow-sm transition-shadow duration-700 hover:shadow-xl">
                  <img 
                    src={getThumbnail(item)} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out md:group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 md:bg-black/20 md:opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-24 md:h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
                         <svg className="w-5 h-5 md:w-10 md:h-10 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                      </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="transition-all duration-700 group-hover:translate-x-3">
                    <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-black/30 mb-2 md:mb-4 font-bold">{item.location} • {item.year}</p>
                    <h3 className="text-xl md:text-3xl font-serif leading-none tracking-tight">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 md:mt-48 text-center reveal">
            <a 
              href={vimeoLibraryUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative inline-block py-6 px-16 border border-black/10 overflow-hidden"
            >
              <span className="relative z-10 uppercase text-black tracking-[0.6em] text-[10px] font-bold transition-colors duration-500 group-hover:text-white">View Full Collection</span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX: Positioned absolutely over the viewport */}
      {selectedVideo && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex flex-col"
          style={{ height: '100dvh', top: 0, left: 0 }}
        >
          {/* Header UI */}
          <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6 md:p-12 z-[100] transition-opacity duration-700 opacity-0 hover:opacity-100 focus-within:opacity-100 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex flex-col">
              <span className="text-white text-[10px] md:text-xs font-serif tracking-[0.5em] uppercase font-bold">Sharipov Production</span>
              <span className="text-white/40 text-[8px] md:text-[9px] tracking-[0.3em] uppercase mt-2">{selectedVideo.title}</span>
            </div>
            <button 
              onClick={closeLightbox} 
              className="text-white text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 bg-white/5 backdrop-blur-xl"
            >
              Close
            </button>
          </div>

          {/* Video Player Center */}
          <div className="flex-grow flex items-center justify-center relative bg-black">
            {isVideoLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[10] bg-black">
                <div className="w-10 h-10 border-t border-white/20 rounded-full animate-spin mb-8"></div>
                <span className="text-white/20 text-[8px] tracking-[0.8em] uppercase font-bold block animate-pulse">Initializing Cinema</span>
              </div>
            )}
            
            <div className="w-full aspect-video max-h-screen relative">
              <iframe 
                src={getEmbedUrl(selectedVideo.videoUrl)} 
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-[1.5s] ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`} 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                onLoad={() => {
                  if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
                  setIsVideoLoading(false);
                }}
              ></iframe>
            </div>
          </div>

          {/* Mobile Bottom Control */}
          <div className="md:hidden absolute bottom-10 left-0 w-full flex flex-col items-center gap-6 z-[100]">
             <button 
              onClick={closeLightbox}
              className="bg-white/10 backdrop-blur-3xl text-white border border-white/20 px-16 py-5 rounded-full text-[9px] tracking-[0.6em] uppercase font-bold active:scale-95 transition-transform shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              Exit Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

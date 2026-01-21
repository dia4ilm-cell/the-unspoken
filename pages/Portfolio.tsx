
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
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // Safety timeout: If video hasn't "loaded" in 4 seconds, clear the overlay anyway
      // to prevent a permanent black screen on flaky mobile connections.
      loadingTimeoutRef.current = window.setTimeout(() => {
        setIsVideoLoading(false);
      }, 4000);

      // Attempt to enter native fullscreen only on non-iOS or desktop
      // iOS Safari has restrictive Fullscreen API behavior for iframes.
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (!isIOS && lightboxRef.current && lightboxRef.current.requestFullscreen) {
        lightboxRef.current.requestFullscreen().catch(err => {
          console.warn("Fullscreen request failed:", err);
        });
      }
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
    };
  }, [selectedVideo, closeLightbox]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && selectedVideo) {
        setSelectedVideo(null);
        setIsVideoLoading(true);
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
    // CRITICAL: Added muted=1 and playsinline=1 for mobile autoplay compatibility
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&playsinline=1&color=ffffff&title=0&byline=0&portrait=0&badge=0&autopause=0` : url;
  };

  const getThumbnail = (item: PortfolioItem) => {
    const id = getVimeoId(item.videoUrl);
    return id ? `https://vumbnail.com/${id}.jpg` : 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000';
  };

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 fade-in bg-white text-black">
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
              <div className="relative overflow-hidden aspect-video mb-6 md:mb-8 bg-gray-100 shadow-sm">
                <img 
                  src={getThumbnail(item)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 md:opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-20 md:h-20 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                       <svg className="w-5 h-5 md:w-8 md:h-8 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                </div>
              </div>
              <div className="flex justify-between items-start px-1 md:px-0">
                <div className="transition-transform duration-500 group-hover:translate-x-2">
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-black/30 mb-2 md:mb-3 font-bold">{item.location} • {item.year}</p>
                  <h3 className="text-xl md:text-3xl font-serif leading-none">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-40 text-center reveal">
          <a href={vimeoLibraryUrl} target="_blank" rel="noopener noreferrer" className="inline-block uppercase text-black border border-black px-8 md:px-12 py-4 md:py-5 hover:bg-black hover:text-white transition-all duration-700 tracking-[0.4em] text-[9px] md:text-[10px] font-bold">
            Full Collection
          </a>
        </div>
      </div>

      {selectedVideo && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[9999] bg-black flex flex-col justify-center items-center"
        >
          {/* Top Bar UI */}
          <div className="absolute top-0 w-full flex justify-between items-center p-6 md:p-10 z-[10001] opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-700">
            <div className="flex flex-col">
              <span className="text-white text-[10px] md:text-xs font-serif tracking-[0.5em] uppercase font-bold">Sharipov Production</span>
              <span className="text-white/40 text-[8px] md:text-[9px] tracking-[0.3em] uppercase mt-1">{selectedVideo.title} — {selectedVideo.location}</span>
            </div>
            <button 
              onClick={closeLightbox} 
              className="text-white text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 bg-black/20 backdrop-blur-md"
            >
              Close
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center relative">
            {isVideoLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[10000] bg-black">
                <div className="w-12 h-12 border-t border-white/20 rounded-full animate-spin mb-4"></div>
                <span className="text-white/30 text-[9px] tracking-[0.5em] uppercase">Cinematic Loading</span>
              </div>
            )}
            
            <div className="w-full h-full">
              <div className="relative w-full h-full bg-black">
                <iframe 
                  src={getEmbedUrl(selectedVideo.videoUrl)} 
                  className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-1000 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`} 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                  onLoad={() => {
                    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
                    setIsVideoLoading(false);
                  }}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Quick Exit UI for Mobile */}
          <div className="md:hidden absolute bottom-12 w-full flex justify-center z-[10001] opacity-60">
             <button 
              onClick={closeLightbox}
              className="bg-white/10 backdrop-blur-lg text-white border border-white/20 px-10 py-4 rounded-full text-[10px] tracking-[0.5em] uppercase font-bold active:scale-95 transition-transform"
            >
              Exit Cinema
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;


import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

  const closeLightbox = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo, closeLightbox]);

  // Extracts Vimeo ID to get either the embed URL or a thumbnail
  const getVimeoInfo = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    if (url === '#') return '#';
    if (url.includes('player.vimeo.com')) return url;
    
    const vimeoId = getVimeoInfo(url);
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&color=ffffff&autoplay=1`;
    }
    return url;
  };

  /**
   * Logic: Exclusively fetch Vimeo thumbnail for all videos.
   * Using vumbnail.com is a standard way to get high-quality 
   * static thumbnails for Vimeo videos without needing an API key.
   */
  const getThumbnail = (item: PortfolioItem) => {
    const vimeoId = getVimeoInfo(item.videoUrl);
    if (vimeoId) {
      // Returns a high-res JPG from the Vimeo video ID
      return `https://vumbnail.com/${vimeoId}.jpg`;
    }
    // Fallback if no ID found
    return 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070';
  };

  const openLightbox = (item: PortfolioItem) => {
    if (item.videoUrl !== '#') {
      setSelectedVideo(item);
    } else {
      window.open(vimeoLibraryUrl, '_blank');
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 fade-in bg-white text-black relative">
      <div className="container mx-auto max-w-6xl">
        {/* Editorial Header */}
        <header className="mb-24">
          <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">The Work</span>
          <h1 className="text-[3.375rem] md:text-[5.4rem] font-serif mb-6 leading-tight tracking-[-0.015em] font-normal">
            The <span className="italic">Portfolio</span>
          </h1>
        </header>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {PORTFOLIO_DATA.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="relative overflow-hidden aspect-video mb-8 bg-black shadow-sm border border-black/5">
                <img 
                  src={getThumbnail(item)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback in case of individual thumbnail load failure
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                       <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black/30 uppercase mb-3 font-bold" style={{ letterSpacing: '0.4em', fontSize: '0.55rem' }}>{item.location} • {item.year}</p>
                  <h3 className="text-2xl md:text-3xl font-serif tracking-tight group-hover:text-black/60 transition-colors">{item.title}</h3>
                </div>
                <div className="pt-3">
                    <svg className="w-5 h-5 text-black/10 group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <a 
            href={vimeoLibraryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block uppercase text-black border border-black/20 px-12 py-5 hover:bg-black hover:text-white transition-all duration-700"
            style={{ letterSpacing: '0.25em', fontSize: '0.65rem' }}
          >
            View Complete Collection
          </a>
        </div>
      </div>

      {/* Robust Fullscreen Lightbox */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-y-auto">
          {/* Header UI inside Modal */}
          <div className="sticky top-0 w-full flex justify-between items-center p-8 md:p-12 bg-white/95 backdrop-blur-md z-[10001] border-b border-black/5">
            <div className="flex items-baseline gap-3">
              <span className="text-lg md:text-xl font-serif tracking-[0.3em] uppercase font-bold">Sharipov</span> 
              <span className="text-[7px] md:text-[8px] tracking-[0.5em] uppercase opacity-30 font-sans font-light hidden sm:inline">Production</span>
            </div>
            
            <button 
              onClick={closeLightbox}
              className="flex items-center gap-4 group px-4 py-2"
              aria-label="Close"
            >
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold opacity-30 group-hover:opacity-100 transition-opacity">Close</span>
              <div className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Video & Info Section */}
          <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 md:py-24">
            <div className="w-full max-w-6xl animate-fade-in">
              <div className="relative w-full aspect-video bg-black shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)]">
                <iframe 
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-16 md:mt-24 text-center max-w-3xl mx-auto pb-20">
                <p className="text-[10px] uppercase tracking-[0.6em] text-black/30 font-bold mb-6">
                  {selectedVideo.location.toUpperCase()} &bull; {selectedVideo.year}
                </p>
                <h2 className="text-4xl md:text-7xl font-serif italic text-black/90 tracking-tight leading-tight">
                  {selectedVideo.title}
                </h2>
                <div className="mt-16 w-12 h-[1px] bg-black/10 mx-auto"></div>
                <div className="mt-12 text-black/20 text-[8px] uppercase tracking-[0.5em] font-light">
                  Cinematic Legacy by Maksud Sharipov
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

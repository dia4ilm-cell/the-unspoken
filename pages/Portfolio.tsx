
import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

  const closeLightbox = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo, closeLightbox]);

  const getEmbedUrl = (url: string) => {
    if (url === '#') return '#';
    if (url.includes('player.vimeo.com')) return url;
    
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`;
    }
    return url;
  };

  const openLightbox = (item: PortfolioItem) => {
    if (item.videoUrl !== '#') {
      setSelectedVideo(item);
    } else {
      window.open(vimeoLibraryUrl, '_blank');
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 fade-in bg-white text-black">
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
              <div className="relative overflow-hidden aspect-video mb-8 bg-gray-50 shadow-sm border border-black/5">
                <img 
                  src={item.coverImage} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white uppercase border border-white/30 px-6 py-3 backdrop-blur-sm" style={{ letterSpacing: '0.35em', fontSize: '0.6rem' }}>
                      {item.videoUrl === '#' ? 'View on Vimeo' : 'Play Film'}
                    </span>
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

      {/* Video Lightbox */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[2000] bg-white flex flex-col overflow-y-auto"
          id="video-modal"
        >
          {/* Static UI Layer: Fixed Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[2100] group p-2"
            aria-label="Close modal"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <svg className="w-10 h-10 text-black/30 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </button>

          {/* Scrollable Content Layer */}
          <div 
            className="flex-grow flex flex-col items-center justify-center p-6 py-24 md:py-40 cursor-zoom-out"
            onClick={closeLightbox}
          >
            {/* Inner Content - click inside doesn't close */}
            <div 
              className="w-full max-w-6xl cursor-default animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video bg-black shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)]">
                <iframe 
                  src={`${getEmbedUrl(selectedVideo.videoUrl)}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-16 md:mt-24 text-center max-w-3xl mx-auto pb-20">
                <p className="uppercase mb-6 opacity-40 font-bold tracking-[0.6em] text-[10px]">
                  {selectedVideo.location.toUpperCase()} • {selectedVideo.year}
                </p>
                <h2 className="text-4xl md:text-7xl font-serif italic text-black/90 tracking-tight leading-tight mb-12">
                  {selectedVideo.title}
                </h2>
                <div className="w-12 h-[1px] bg-black/10 mx-auto"></div>
                <div className="mt-12 text-black/30 text-[9px] uppercase tracking-[0.5em] font-light">
                  Sharipov Production &copy; {selectedVideo.year}
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

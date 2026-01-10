
// Fix: Import React and use React.FC for the component type
import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

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
      document.body.style.overflow = 'hidden';
    } else {
      window.open(vimeoLibraryUrl, '_blank');
    }
  };

  const closeLightbox = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
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
                  alt="" // Empty alt to prevent showing title when image is broken during transition
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

        {/* Call to Action Button */}
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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white p-0 transition-opacity duration-700 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.03)_0%,_rgba(255,255,255,1)_70%)]"></div>
          <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox}></div>
          
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-black/30 hover:text-black transition-all p-2 z-[1010]"
            aria-label="Close"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="relative w-full max-w-5xl z-10 flex flex-col items-center animate-fade-in px-4">
            <div className="w-full bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center aspect-video">
              <iframe 
                src={`${getEmbedUrl(selectedVideo.videoUrl)}?autoplay=1&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-16 text-center text-black w-full select-none">
              <p className="uppercase mb-4 opacity-40 font-medium" style={{ letterSpacing: '0.6em', fontSize: '0.55rem' }}>
                {selectedVideo.location.toUpperCase()} • {selectedVideo.year}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif italic text-black/90 tracking-tight">
                {selectedVideo.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

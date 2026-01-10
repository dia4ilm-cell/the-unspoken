
import { useState } from 'react';
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
    <div className="pt-32 pb-24 px-6 fade-in">
      <div className="container mx-auto">
        <header className="text-center mb-24 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-12">The Portfolio</h1>
          <a 
            href={vimeoLibraryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-[0.3em] uppercase text-black border border-black/20 px-10 py-4 hover:bg-black hover:text-white transition-all duration-700"
          >
            Watch Full Library on Vimeo
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {PORTFOLIO_DATA.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="relative overflow-hidden aspect-video mb-6 shadow-sm border border-black/5">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-[9px] tracking-[0.4em] uppercase border border-white/30 px-6 py-3 backdrop-blur-sm">
                      {item.videoUrl === '#' ? 'View on Vimeo' : 'Play Film'}
                    </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] tracking-[0.3em] text-black/40 uppercase mb-2 font-bold">{item.location} • {item.year}</p>
                  <h3 className="text-xl md:text-2xl font-serif group-hover:text-black transition-colors">{item.title}</h3>
                </div>
                <div className="pt-2">
                    <svg className="w-4 h-4 text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-12 fade-in">
          {/* Фон для закрытия при клике */}
          <div className="absolute inset-0 z-0" onClick={closeLightbox}></div>
          
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white transition-all p-4 z-[210] cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="relative z-10 w-full max-w-6xl max-h-full flex flex-col items-center justify-center">
            <div className="w-full aspect-video bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
              <iframe 
                src={`${getEmbedUrl(selectedVideo.videoUrl)}?autoplay=1&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-center text-white/80 pointer-events-none">
              <p className="text-[9px] tracking-[0.6em] uppercase mb-3 opacity-40 font-bold">{selectedVideo.location} • {selectedVideo.year}</p>
              <h2 className="text-2xl md:text-3xl font-serif italic text-white">{selectedVideo.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

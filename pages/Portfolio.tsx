
import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../constants.tsx';
import { PortfolioItem } from '../types.ts';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const vimeoLibraryUrl = "https://vimeo.com/priorityfilm";

  const closeLightbox = useCallback(() => setSelectedVideo(null), []);

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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, closeLightbox]);

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string) => {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0` : url;
  };

  const getThumbnail = (item: PortfolioItem) => {
    const id = getVimeoId(item.videoUrl);
    return id ? `https://vumbnail.com/${id}.jpg` : 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000';
  };

  return (
    <div className="pt-40 pb-24 px-6 fade-in bg-white text-black">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-24">
          <span className="text-black/40 tracking-[0.5em] text-[10px] uppercase block mb-6 font-bold">The Work</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight tracking-tighter">
            The <span className="italic">Portfolio</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {PORTFOLIO_DATA.map((item) => (
            <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedVideo(item)}>
              <div className="relative overflow-hidden aspect-video mb-8 bg-black shadow-sm">
                <img 
                  src={getThumbnail(item)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                       <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mb-3 font-bold">{item.location} • {item.year}</p>
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <a href={vimeoLibraryUrl} target="_blank" rel="noopener noreferrer" className="inline-block uppercase text-black border border-black px-12 py-5 hover:bg-black hover:text-white transition-all tracking-[0.3em] text-[10px] font-bold">
            Full Collection
          </a>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
          <div className="sticky top-0 w-full flex justify-between items-center p-8 bg-white/95 backdrop-blur-md border-b border-black/5">
            <span className="text-lg font-serif tracking-[0.3em] uppercase font-bold">Sharipov</span>
            <button onClick={closeLightbox} className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-30 hover:opacity-100">Close</button>
          </div>
          <div className="flex-grow flex items-center justify-center p-6">
            <div className="w-full max-w-6xl">
              <div className="relative w-full aspect-video bg-black shadow-2xl">
                <iframe src={getEmbedUrl(selectedVideo.videoUrl)} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

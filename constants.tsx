
import { PortfolioItem } from './types';

/**
 * ИНСТРУКЦИЯ ПО ЗАМЕНЕ:
 * 1. videoUrl: Можно просто вставить ссылку на видео, например https://vimeo.com/123456789
 * 2. ВАЖНО: Если видео не грузится, проверьте в настройках Vimeo (Privacy), что разрешено встраивание (Embed) на другие сайты.
 */

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    title: 'Eternal Love',
    location: 'Paris, France',
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '2',
    title: 'Ranch Elegance',
    location: 'California, USA',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974',
    videoUrl: 'https://vimeo.com/150035542', 
    year: '2023'
  },
  {
    id: '3',
    title: 'Tuscan Sunset',
    location: 'Tuscany, Italy',
    coverImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2023'
  },
  {
    id: '4',
    title: 'Morning Bloom',
    location: 'Provence, France',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '5',
    title: 'City Lights',
    location: 'New York, USA',
    coverImage: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2074',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '6',
    title: 'Highland Soul',
    location: 'Isle of Skye, Scotland',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2023'
  }
];

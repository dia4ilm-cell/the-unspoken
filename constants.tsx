
import { PortfolioItem } from './types';

/**
 * ИНСТРУКЦИЯ:
 * Вы загрузили 'cover2.jpg'. В коде ниже для второго элемента 
 * теперь прописан путь './cover2.jpg'. 
 * 
 * Если вы загрузите 'cover1.jpg', 'cover3.jpg' и т.д., 
 * просто меняйте ссылки ниже на локальные пути.
 */

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    title: 'Eternal Love',
    location: 'Paris, France',
    // Оставляем временную ссылку, пока не загрузите cover1.jpg
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069', 
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '2',
    title: 'Hummingbird Nest Ranch',
    location: 'California, USA',
    // ТЕПЕРЬ ИСПОЛЬЗУЕТСЯ ВАШ ФАЙЛ:
    coverImage: './cover2.jpg',
    videoUrl: 'https://vimeo.com/1098693064', 
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
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070',
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

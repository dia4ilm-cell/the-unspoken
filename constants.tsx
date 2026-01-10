
import { PortfolioItem } from './types';

/**
 * ИНСТРУКЦИЯ ПО ЗАМЕНЕ:
 * 1. videoUrl: Используйте ссылку формата https://player.vimeo.com/video/ID_ВИДЕО
 * 2. coverImage: Прямая ссылка на изображение (jpg/png) для обложки.
 * 3. id: Уникальная строка или цифра для каждого проекта.
 */

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    title: 'Two of Us',
    location: 'Paris, France',
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069',
    videoUrl: 'https://player.vimeo.com/video/382879350',
    year: '2019'
  },
  {
    id: '2',
    title: 'Ethereal Romance',
    location: 'Hummingbird nest ranch, California',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974',
    videoUrl: 'https://player.vimeo.com/video/1135886882', // Замените на вашу ссылку
    year: '2023'
  },
  {
    id: '3',
    title: 'Sunset Vows',
    location: 'Tuscany, Italy',
    coverImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070',
    videoUrl: 'https://player.vimeo.com/video/382879350', // Замените на вашу ссылку
    year: '2023'
  },
  {
    id: '4',
    title: 'Parisian Love',
    location: 'Paris, France',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
    videoUrl: 'https://player.vimeo.com/video/382879350', // Замените на вашу ссылку
    year: '2024'
  },
  {
    id: '5',
    title: 'Minimalist Elopement',
    location: 'New York, USA',
    coverImage: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2074',
    videoUrl: 'https://player.vimeo.com/video/382879350', // Замените на вашу ссылку
    year: '2024'
  },
  {
    id: '6',
    title: 'Wild Hearts',
    location: 'Highlands, Scotland',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070',
    videoUrl: 'https://player.vimeo.com/video/382879350', // Замените на вашу ссылку
    year: '2023'
  }
];

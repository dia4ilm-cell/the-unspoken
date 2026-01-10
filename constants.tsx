
import { PortfolioItem } from './types';

/**
 * ИНСТРУКЦИЯ ПО ЛОКАЛЬНОМУ ХРАНЕНИЮ:
 * 
 * 1. Поместите ваши фото в корневую папку проекта (рядом с index.html).
 * 2. В поле coverImage укажите путь к файлу, начиная с './'
 *    Пример: coverImage: './my-wedding-photo.jpg'
 * 
 * 3. Для видео мы по-прежнему рекомендуем использовать Vimeo, 
 *    так как это обеспечивает лучшую скорость загрузки и качество плеера.
 */

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    title: 'Eternal Love',
    location: 'Paris, France',
    // Просто положите файл с названием 'cover1.jpg' в папку с сайтом
    coverImage: './cover1.jpg', 
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '2',
    title: 'Hummingbird Nest Ranch',
    location: 'California, USA',
    coverImage: './cover2.jpg',
    videoUrl: 'https://vimeo.com/1098693064', 
    year: '2023'
  },
  {
    id: '3',
    title: 'Tuscan Sunset',
    location: 'Tuscany, Italy',
    coverImage: './cover3.jpg',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2023'
  },
  {
    id: '4',
    title: 'Morning Bloom',
    location: 'Provence, France',
    coverImage: './cover4.jpg',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '5',
    title: 'City Lights',
    location: 'New York, USA',
    coverImage: './cover5.jpg',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2024'
  },
  {
    id: '6',
    title: 'Highland Soul',
    location: 'Isle of Skye, Scotland',
    coverImage: './cover6.jpg',
    videoUrl: 'https://vimeo.com/382879350',
    year: '2023'
  }
];

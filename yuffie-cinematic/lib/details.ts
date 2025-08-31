export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  description?: string;
  photoCredit?: string;
  sourceLink?: string;
  people?: string[];
}

export interface CinematicDetail {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  creator: string;
  cover: string;
  cast: string[];
  carouselImages: string[];
  rating: number;
  genre?: string[];
  duration?: number;
  galleryImages?: GalleryImage[];
  type: "movie" | "serie" | "anime";
}

import { movieDetails } from "./movies";
import { seriesDetails } from "./series";
import { animeDetails } from "./animes";

export const cinematics: CinematicDetail[] = [
  ...movieDetails,
  ...seriesDetails,
  ...animeDetails,
];

export const movies = movieDetails;
export const series = seriesDetails;
export const animes = animeDetails;

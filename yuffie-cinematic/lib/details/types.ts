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

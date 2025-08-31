import { CinematicDetail } from "./types"; 

export * from "./types";
export * from "./movies";
export * from "./series";
export * from "./animes";

import { movieDetails } from "./movies";
import { serieDetails } from "./series";
import { animeDetails } from "./animes";

export const cinematics: CinematicDetail[] = [
  ...movieDetails,
  ...serieDetails,
  ...animeDetails,
];

export const movies = movieDetails;
export const series = serieDetails;
export const animes = animeDetails;

export * from "./types";

export { movieItems as movies } from "./movies";
export { seriesItems as series } from "./series";
export { animeItems as animes } from "./animes";

import { movieItems } from "./movies";
import { seriesItems } from "./series";
import { animeItems } from "./animes";

export const items = [...movieItems, ...seriesItems, ...animeItems];

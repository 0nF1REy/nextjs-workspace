export type Item = {
  id: string;
  title: string;
  poster: string;
  video?: string | null;
  type: "movie" | "serie" | "anime";
};

export interface CinematicItem {
  id: string;
  title: string;
  poster: string;
  cover: string;
}

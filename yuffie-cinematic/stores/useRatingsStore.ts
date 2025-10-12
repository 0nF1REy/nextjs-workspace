import { create } from "zustand";
import { UserRating } from "@/lib/user/types";

interface RatingsState {
  ratings: Record<string, UserRating>;
  setRatings: (ratings: Record<string, UserRating>) => void;
  setRating: (movieId: string, rating: number) => Promise<void>;
  getRating: (movieId: string) => number | null;
}

export const useRatingsStore = create<RatingsState>((set, get) => ({
  ratings: {},
  setRatings: (ratings) => set({ ratings }),
  setRating: async (movieId, rating) => {
    const currentRatings = get().ratings;
    const optimisticRating: UserRating = {
      movieId,
      rating,
      timestamp: Date.now(),
    };

    const optimisticRatings = {
      ...currentRatings,
      [movieId]: optimisticRating,
    };
    set({ ratings: optimisticRatings });

    try {
      await fetch("/api/user/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, rating }),
      });
    } catch {
      set({ ratings: currentRatings });
    }
  },
  getRating: (movieId) => {
    return get().ratings[movieId]?.rating || null;
  },
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRating } from "@/lib/user/types";

interface RatingsState {
  // State
  ratings: Record<string, UserRating>; // movieId -> rating
  
  // Actions
  setRating: (movieId: string, rating: number) => void;
  removeRating: (movieId: string) => void;
  clearRatings: () => void;
  
  // Getters
  getRating: (movieId: string) => number | null;
  getAllRatings: () => UserRating[];
  getAverageRating: () => number;
  getRatingsCount: () => number;
  getRatingsByValue: (rating: number) => UserRating[];
}

export const useRatingsStore = create<RatingsState>()(
  persist(
    (set, get) => ({
      // Initial state
      ratings: {},

      // Actions
      setRating: (movieId, rating) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [movieId]: {
              movieId,
              rating,
              timestamp: Date.now(),
            },
          },
        })),

      removeRating: (movieId) =>
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [movieId]: _, ...rest } = state.ratings;
          return { ratings: rest };
        }),

      clearRatings: () => set({ ratings: {} }),

      // Getters
      getRating: (movieId) => {
        const state = get();
        return state.ratings[movieId]?.rating || null;
      },

      getAllRatings: () => {
        const state = get();
        return Object.values(state.ratings).sort(
          (a, b) => b.timestamp - a.timestamp
        );
      },

      getAverageRating: () => {
        const state = get();
        const ratings = Object.values(state.ratings);
        if (ratings.length === 0) return 0;
        
        const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        return Number((sum / ratings.length).toFixed(1));
      },

      getRatingsCount: () => {
        const state = get();
        return Object.keys(state.ratings).length;
      },

      getRatingsByValue: (rating) => {
        const state = get();
        return Object.values(state.ratings)
          .filter((r) => r.rating === rating)
          .sort((a, b) => b.timestamp - a.timestamp);
      },
    }),
    {
      name: "yuffie-ratings-storage",
      partialize: (state) => ({
        ratings: state.ratings,
      }),
    }
  )
);

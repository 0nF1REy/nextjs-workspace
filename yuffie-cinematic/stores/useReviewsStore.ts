import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikedReviewsState {
  likedReviewIds: string[];

  toggleLike: (reviewId: string) => void;

  isReviewLiked: (reviewId: string) => boolean;
}

export const useReviewsStore = create<LikedReviewsState>()(
  persist(
    (set, get) => ({
      likedReviewIds: [],

      toggleLike: (reviewId) =>
        set((state) => {
          const isLiked = state.likedReviewIds.includes(reviewId);
          return {
            likedReviewIds: isLiked
              ? state.likedReviewIds.filter((id) => id !== reviewId)
              : [...state.likedReviewIds, reviewId],
          };
        }),

      isReviewLiked: (reviewId) => {
        const state = get();
        return state.likedReviewIds.includes(reviewId);
      },
    }),
    {
      name: "yuffie-liked-reviews-storage",
      partialize: (state) => ({
        likedReviewIds: state.likedReviewIds,
      }),
    }
  )
);

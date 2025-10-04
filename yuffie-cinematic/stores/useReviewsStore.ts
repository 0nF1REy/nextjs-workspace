import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserReview } from "@/lib/user/types";

interface ReviewsState {
  // State
  reviews: Record<string, UserReview[]>; // cinematicId -> reviews
  likedReviews: string[]; // reviewIds
  
  // Actions
  addReview: (cinematicId: string, review: UserReview) => void;
  updateReview: (cinematicId: string, reviewId: string, content: string, rating: number) => void;
  deleteReview: (cinematicId: string, reviewId: string) => void;
  toggleLike: (reviewId: string) => void;
  
  // Getters
  getReviewsByCinematic: (cinematicId: string) => UserReview[];
  getAllReviews: () => UserReview[];
  isReviewLiked: (reviewId: string) => boolean;
  getReviewLikesCount: (reviewId: string) => number;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      // Initial state
      reviews: {},
      likedReviews: [],

      // Actions
      addReview: (cinematicId, review) =>
        set((state) => ({
          reviews: {
            ...state.reviews,
            [cinematicId]: [...(state.reviews[cinematicId] || []), review],
          },
        })),

      updateReview: (cinematicId, reviewId, content, rating) =>
        set((state) => ({
          reviews: {
            ...state.reviews,
            [cinematicId]: (state.reviews[cinematicId] || []).map((review) =>
              review.id === reviewId
                ? { ...review, content, rating }
                : review
            ),
          },
        })),

      deleteReview: (cinematicId, reviewId) =>
        set((state) => ({
          reviews: {
            ...state.reviews,
            [cinematicId]: (state.reviews[cinematicId] || []).filter(
              (review) => review.id !== reviewId
            ),
          },
          // Remove likes do review deletado
          likedReviews: state.likedReviews.filter((id) => id !== reviewId),
        })),

      toggleLike: (reviewId) =>
        set((state) => {
          const isLiked = state.likedReviews.includes(reviewId);
          return {
            likedReviews: isLiked
              ? state.likedReviews.filter((id) => id !== reviewId)
              : [...state.likedReviews, reviewId],
          };
        }),

      // Getters
      getReviewsByCinematic: (cinematicId) => {
        const state = get();
        return state.reviews[cinematicId] || [];
      },

      getAllReviews: () => {
        const state = get();
        const allReviews: UserReview[] = [];
        
        Object.values(state.reviews).forEach((cinematicReviews) => {
          allReviews.push(...cinematicReviews);
        });
        
        return allReviews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },

      isReviewLiked: (reviewId) => {
        const state = get();
        return state.likedReviews.includes(reviewId);
      },

      getReviewLikesCount: (reviewId) => {
        const state = get();
        return state.likedReviews.filter((id) => id === reviewId).length;
      },
    }),
    {
      name: "yuffie-reviews-storage",
      partialize: (state) => ({
        reviews: state.reviews,
        likedReviews: state.likedReviews,
      }),
    }
  )
);

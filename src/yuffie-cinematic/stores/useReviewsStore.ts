import { create } from "zustand";

interface LikedReviewsState {
  likedReviewIds: string[];
  setLikes: (likedIds: string[]) => void;
  toggleLike: (reviewId: string) => Promise<void>;
  isReviewLiked: (reviewId: string) => boolean;
}

export const useReviewsStore = create<LikedReviewsState>((set, get) => ({
  likedReviewIds: [],
  setLikes: (likedIds) => set({ likedReviewIds: likedIds }),
  toggleLike: async (reviewId: string) => {
    const currentLikes = get().likedReviewIds;
    const isLiked = currentLikes.includes(reviewId);

    const optimisticLikes = isLiked
      ? currentLikes.filter((id) => id !== reviewId)
      : [...currentLikes, reviewId];

    set({ likedReviewIds: optimisticLikes });

    try {
      await fetch("/api/user/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });
    } catch {
      set({ likedReviewIds: currentLikes });
    }
  },
  isReviewLiked: (reviewId) => {
    return get().likedReviewIds.includes(reviewId);
  },
}));

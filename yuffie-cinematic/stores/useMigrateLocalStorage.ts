import { useEffect } from "react";
import { useReviewsStore, useFavoritesStore, useRatingsStore } from "./index";
import { FavoriteItem, UserRating } from "@/lib/user/types";

export const useMigrateLocalStorage = () => {
  const { toggleLike } = useReviewsStore();
  const { toggleFavorite } = useFavoritesStore();
  const { setRating } = useRatingsStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const migrated = localStorage.getItem("yuffie-migrated-to-zustand");
    if (migrated === "true") return;

    try {
      const likedReviews = localStorage.getItem("liked-reviews");
      if (likedReviews) {
        const likes: string[] = JSON.parse(likedReviews);
        likes.forEach((reviewId) => {
          if (!useReviewsStore.getState().isReviewLiked(reviewId)) {
            toggleLike(reviewId);
          }
        });
      }

      const favorites = localStorage.getItem("user-favorites");
      if (favorites) {
        const favs: FavoriteItem[] = JSON.parse(favorites);
        favs.forEach((fav) => {
          if (!useFavoritesStore.getState().isFavorite(fav.id)) {
            toggleFavorite(fav);
          }
        });
      }

      const userRatingsKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("movie-rating-")) {
          userRatingsKeys.push(key);
        }
      }

      userRatingsKeys.forEach((key) => {
        const movieId = key.replace("movie-rating-", "");
        const stored = localStorage.getItem(key);
        if (stored) {
          const rating: UserRating = JSON.parse(stored);
          setRating(movieId, rating.rating);
        }
      });

      localStorage.setItem("yuffie-migrated-to-zustand", "true");
    } catch {}
  }, [toggleLike, toggleFavorite, setRating]);
};

export const useClearOldStorage = () => {
  const clearOldStorage = () => {
    if (typeof window === "undefined") return;

    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith("user-reviews-") ||
          key.startsWith("movie-rating-") ||
          key === "liked-reviews" ||
          key === "user-favorites")
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return { clearOldStorage };
};

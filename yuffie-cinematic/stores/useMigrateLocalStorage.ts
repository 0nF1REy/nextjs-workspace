import { useEffect } from "react";
import { useReviewsStore, useFavoritesStore, useRatingsStore } from "./index";
import { UserReview, FavoriteItem, UserRating } from "@/lib/user/types";

// Hook para migração de dados do localStorage para Zustand
export const useMigrateLocalStorage = () => {
  const { addReview, toggleLike } = useReviewsStore();
  const { addFavorite } = useFavoritesStore();
  const { setRating } = useRatingsStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Flag para verificar se já migrou
    const migrated = localStorage.getItem("yuffie-migrated-to-zustand");
    if (migrated === "true") return;

    try {
      // Migrar Reviews
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("user-reviews-")) {
          const cinematicId = key.replace("user-reviews-", "");
          const stored = localStorage.getItem(key);
          if (stored) {
            const reviews: UserReview[] = JSON.parse(stored);
            reviews.forEach((review) => {
              addReview(cinematicId, review);
            });
          }
        }
      }

      // Migrar Likes
      const likedReviews = localStorage.getItem("liked-reviews");
      if (likedReviews) {
        const likes: string[] = JSON.parse(likedReviews);
        likes.forEach((reviewId) => {
          toggleLike(reviewId);
        });
      }

      // Migrar Favoritos
      const favorites = localStorage.getItem("user-favorites");
      if (favorites) {
        const favs: FavoriteItem[] = JSON.parse(favorites);
        favs.forEach((fav) => {
          addFavorite(fav);
        });
      }

      // Migrar Ratings (Avaliações)
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

      // Marcar como migrado
      localStorage.setItem("yuffie-migrated-to-zustand", "true");

      if (process.env.NODE_ENV === "development") {
        console.log("Migração para Zustand concluída!");
      }
    } catch (error) {
      console.error("Erro na migração:", error);
    }
  }, [addReview, toggleLike, addFavorite, setRating]);
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

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Removidas ${keysToRemove.length} chaves antigas do localStorage`
      );
    }
  };

  return { clearOldStorage };
};

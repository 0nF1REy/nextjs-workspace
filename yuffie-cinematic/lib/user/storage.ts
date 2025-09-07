import { UserReview, FavoriteItem, UserRating } from "./types";

// ==================== REVIEWS ====================
export const getUserReviewsFromStorage = (
  cinematicId?: string
): UserReview[] => {
  if (typeof window === "undefined") return [];
  try {
    if (cinematicId) {
      const stored = localStorage.getItem(`user-reviews-${cinematicId}`);
      return stored ? JSON.parse(stored) : [];
    } else {
      // Buscar todas as reviews
      const reviews: UserReview[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("user-reviews-")) {
          const stored = localStorage.getItem(key);
          if (stored) {
            const cinematicReviews: UserReview[] = JSON.parse(stored);
            reviews.push(...cinematicReviews);
          }
        }
      }
      return reviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch {
    return [];
  }
};

export const saveUserReviewToStorage = (
  cinematicId: string,
  review: UserReview
): void => {
  if (typeof window === "undefined") return;
  try {
    const existingReviews = getUserReviewsFromStorage(cinematicId);
    const updatedReviews = [...existingReviews, review];
    localStorage.setItem(
      `user-reviews-${cinematicId}`,
      JSON.stringify(updatedReviews)
    );
  } catch (error) {
    console.error("Falha ao salvar a review:", error);
  }
};

// ==================== LIKES ====================
export const getLikedReviewsFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("liked-reviews");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveLikedReviewToStorage = (reviewId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const likedReviews = getLikedReviewsFromStorage();
    if (!likedReviews.includes(reviewId)) {
      likedReviews.push(reviewId);
      localStorage.setItem("liked-reviews", JSON.stringify(likedReviews));
    }
  } catch (error) {
    console.error("Falha ao salvar like:", error);
  }
};

export const removeLikedReviewFromStorage = (reviewId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const likedReviews = getLikedReviewsFromStorage();
    const updatedLikes = likedReviews.filter((id) => id !== reviewId);
    localStorage.setItem("liked-reviews", JSON.stringify(updatedLikes));
  } catch (error) {
    console.error("Falha ao remover like:", error);
  }
};

// ==================== FAVORITOS ====================
export const getFavoritesFromStorage = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("user-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveFavoriteToStorage = (item: FavoriteItem): void => {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavoritesFromStorage();
    const existingIndex = favorites.findIndex((fav) => fav.id === item.id);

    if (existingIndex === -1) {
      favorites.push(item);
      localStorage.setItem("user-favorites", JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Falha ao salvar favorito:", error);
  }
};

export const removeFavoriteFromStorage = (itemId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = favorites.filter((fav) => fav.id !== itemId);
    localStorage.setItem("user-favorites", JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Falha ao remover favorito:", error);
  }
};

export const isFavoriteInStorage = (itemId: string): boolean => {
  const favorites = getFavoritesFromStorage();
  return favorites.some((fav) => fav.id === itemId);
};

// ==================== RATINGS ====================
export const getUserRatings = (): UserRating[] => {
  if (typeof window === "undefined") return [];
  try {
    const ratings: UserRating[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("movie-rating-")) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const rating: UserRating = JSON.parse(stored);
          ratings.push(rating);
        }
      }
    }
    return ratings.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
};

export const getUserRatingFromStorage = (movieId: string): number | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`movie-rating-${movieId}`);
    if (stored) {
      const rating: UserRating = JSON.parse(stored);
      return rating.rating;
    }
    return null;
  } catch {
    return null;
  }
};

export const saveUserRatingToStorage = (
  movieId: string,
  rating: number
): void => {
  if (typeof window === "undefined") return;
  try {
    const userRating: UserRating = {
      movieId,
      rating,
      timestamp: Date.now(),
    };
    localStorage.setItem(`movie-rating-${movieId}`, JSON.stringify(userRating));
  } catch (error) {
    console.error("Falha ao salvar rating:", error);
  }
};

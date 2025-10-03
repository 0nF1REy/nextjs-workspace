import {
  saveLikedReviewToStorage,
  removeLikedReviewFromStorage,
} from "@/lib/user/storage";
import { ReviewsState, ReviewsAction } from "./types";

export function reviewsReducer(
  state: ReviewsState,
  action: ReviewsAction
): ReviewsState {
  switch (action.type) {
    case "INITIALIZE": {
      const { reviews, userReviews, likedReviews, cinematicId } =
        action.payload;

      const reviewsFromProps = reviews.map((review) => ({
        ...review,
        cinematicId: cinematicId,
        avatarSeed: review.author,
        likes: likedReviews.includes(review.id) ? 1 : 0,
      }));

      const adjustedUserReviews = userReviews.map((review) => ({
        ...review,
        likes: likedReviews.includes(review.id) ? 1 : review.likes,
      }));

      const combinedReviews = [...reviewsFromProps, ...adjustedUserReviews];

      return {
        ...state,
        allReviews: combinedReviews,
        userReviews: userReviews,
        likedReviews: likedReviews,
      };
    }
    case "TOGGLE_LIKE": {
      const { reviewId } = action.payload;
      const isCurrentlyLiked = state.likedReviews.includes(reviewId);

      if (isCurrentlyLiked) {
        removeLikedReviewFromStorage(reviewId);
      } else {
        saveLikedReviewToStorage(reviewId);
      }

      return {
        ...state,
        likedReviews: isCurrentlyLiked
          ? state.likedReviews.filter((id) => id !== reviewId)
          : [...state.likedReviews, reviewId],
        allReviews: state.allReviews.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                likes: Math.max(
                  0,
                  (review.likes || 0) + (isCurrentlyLiked ? -1 : 1)
                ),
              }
            : review
        ),
      };
    }
    case "EDIT_REVIEW": {
      const { reviewId, newContent, newRating } = action.payload;
      return {
        ...state,
        allReviews: state.allReviews.map((review) =>
          review.id === reviewId
            ? { ...review, content: newContent, rating: newRating }
            : review
        ),
        userReviews: state.userReviews.map((review) =>
          review.id === reviewId
            ? { ...review, content: newContent, rating: newRating }
            : review
        ),
      };
    }
    case "DELETE_REVIEW": {
      const { reviewId } = action.payload;
      return {
        ...state,
        allReviews: state.allReviews.filter((review) => review.id !== reviewId),
        userReviews: state.userReviews.filter(
          (review) => review.id !== reviewId
        ),
      };
    }
    case "ADD_REVIEW": {
      const { newReview } = action.payload;
      return {
        ...state,
        userReviews: [...state.userReviews, newReview],
        allReviews: [...state.allReviews, newReview],
      };
    }
    default:
      return state;
  }
}

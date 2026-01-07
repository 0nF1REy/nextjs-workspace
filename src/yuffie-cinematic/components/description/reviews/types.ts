import { Review } from "@/lib/details/types";
import { UserReview } from "@/lib/user/types";

export interface MovieDetailsProps {
  genre?: string[];
  duration?: number;
}

export type ReviewsState = {
  allReviews: ((Review | UserReview) & {
    likes: number;
    avatarSeed?: string;
  })[];
  likedReviews: string[];
  userReviews: UserReview[];
};

export type ReviewsAction =
  | {
      type: "INITIALIZE";
      payload: {
        reviews: Review[];
        userReviews: UserReview[];
        likedReviews: string[];
        cinematicId: string;
      };
    }
  | { type: "TOGGLE_LIKE"; payload: { reviewId: string } }
  | { type: "ADD_REVIEW"; payload: { newReview: UserReview } }
  | {
      type: "EDIT_REVIEW";
      payload: {
        reviewId: string;
        newContent: string;
        newRating: number;
      };
    }
  | { type: "DELETE_REVIEW"; payload: { reviewId: string } };

export type { Review, UserReview };

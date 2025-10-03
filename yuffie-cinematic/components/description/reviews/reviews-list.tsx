"use client";

import { useState, useEffect, useCallback, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  getUserReviewsFromStorage,
  saveUserReviewToStorage,
  getLikedReviewsFromStorage,
  updateUserReviewInStorage,
  deleteUserReviewFromStorage,
} from "@/lib/user/storage";
import { ReviewForm } from "./review-form";
import { ReviewItem } from "./review-item";
import { reviewsReducer } from "./reviews-reducer";
import { Review, UserReview, ReviewsState } from "./types";

interface ReviewsListProps {
  reviews: Review[];
  cinematicId: string;
  onNewReview: (review: UserReview) => void;
}

export function ReviewsList({
  reviews,
  cinematicId,
  onNewReview,
}: ReviewsListProps) {
  const [showReviews, setShowReviews] = useState(false);

  const initialState: ReviewsState = {
    allReviews: [],
    likedReviews: [],
    userReviews: [],
  };

  const [state, dispatch] = useReducer(reviewsReducer, initialState);
  const { allReviews, likedReviews } = state;

  useEffect(() => {
    const userReviewsFromStorage = getUserReviewsFromStorage(cinematicId);
    const likedReviewsFromStorage = getLikedReviewsFromStorage();
    dispatch({
      type: "INITIALIZE",
      payload: {
        reviews: reviews,
        userReviews: userReviewsFromStorage,
        likedReviews: likedReviewsFromStorage,
        cinematicId: cinematicId,
      },
    });
  }, [cinematicId, reviews]);

  const handleLike = useCallback((reviewId: string) => {
    dispatch({ type: "TOGGLE_LIKE", payload: { reviewId } });
  }, []);

  const handleNewReview = useCallback(
    (newReview: UserReview) => {
      saveUserReviewToStorage(cinematicId, newReview);
      dispatch({ type: "ADD_REVIEW", payload: { newReview } });
      onNewReview(newReview);
      setShowReviews(true);
    },
    [cinematicId, onNewReview]
  );

  const handleEditReview = useCallback(
    (reviewId: string, newContent: string, newRating: number) => {
      dispatch({
        type: "EDIT_REVIEW",
        payload: { reviewId, newContent, newRating },
      });

      updateUserReviewInStorage(cinematicId, reviewId, newContent, newRating);

      window.dispatchEvent(new CustomEvent("userReviewsUpdated"));
    },
    [cinematicId]
  );

  const handleDeleteReview = useCallback(
    (reviewId: string) => {
      dispatch({ type: "DELETE_REVIEW", payload: { reviewId } });
      deleteUserReviewFromStorage(cinematicId, reviewId);

      window.dispatchEvent(new CustomEvent("userReviewsUpdated"));
    },
    [cinematicId]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Formulário */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mb-4 ${
          showReviews
            ? "max-h-0 opacity-0 scale-95"
            : "max-h-[600px] opacity-100 scale-100"
        }`}
      >
        <ReviewForm cinematicId={cinematicId} onSubmit={handleNewReview} />
      </div>

      {/* Botão de toggle */}
      <div className="flex-shrink-0 mb-4">
        <Button
          onClick={() => setShowReviews(!showReviews)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 flex items-center justify-between"
          variant="outline"
        >
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
            {showReviews ? "Ocultar Reviews" : "Ver Reviews Disponíveis"}
            {allReviews.length > 0 && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {allReviews.length}
              </span>
            )}
          </span>
          <FontAwesomeIcon
            icon={showReviews ? faChevronUp : faChevronDown}
            className="w-4 h-4"
          />
        </Button>
      </div>

      {/* Lista de reviews */}
      {showReviews && (
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {allReviews.length > 0 ? (
              allReviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  onLike={handleLike}
                  isLiked={likedReviews.includes(review.id)}
                  cinematicId={cinematicId}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <FontAwesomeIcon icon={faStar} className="w-12 h-12 mb-3" />
                <p className="text-center">
                  Nenhuma review ainda. Seja o primeiro a avaliar!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!showReviews && allReviews.length > 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <FontAwesomeIcon icon={faStar} className="w-8 h-8 mb-2" />
            <p className="text-sm">
              Clique em &ldquo;Ver Reviews Disponíveis&rdquo; para ler as
              avaliações
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

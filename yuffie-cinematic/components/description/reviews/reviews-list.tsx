"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useReviewsStore } from "@/stores";
import { ReviewForm } from "./review-form";
import { ReviewItem } from "./review-item";
import { Review, UserReview } from "./types";

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

  // Zustand store
  const { getReviewsByCinematic, addReview } = useReviewsStore();

  // Combinar reviews externas com reviews do usuário
  const userReviews = getReviewsByCinematic(cinematicId);
  const allReviews = [
    ...reviews.map((review) => ({
      ...review,
      likes: 0,
      avatarSeed: `review-${review.id}`,
    })),
    ...userReviews,
  ];

  const handleNewReview = useCallback(
    (newReview: UserReview) => {
      addReview(cinematicId, newReview);
      onNewReview(newReview);
      setShowReviews(true);
    },
    [cinematicId, addReview, onNewReview]
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
          <div className="h-full overflow-y-auto pr-2 space-y-4 scrollbar-cinema">
            {allReviews.length > 0 ? (
              allReviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  cinematicId={cinematicId}
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

"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { ReviewForm } from "./review-form";
import { ReviewItem } from "./review-item";
import { Review, UserReview } from "./types";

type ReviewsListProps = {
  cinematicId: string;
};

export function ReviewsList({ cinematicId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<(Review | UserReview)[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const refreshReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?cinematicId=${cinematicId}`);
      const data = await res.json();
      setReviews(data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [cinematicId]);

  useEffect(() => {
    refreshReviews();
  }, [refreshReviews]);

  const handleNewReview = useCallback(
    async (newReviewData: {
      content: string;
      rating: number;
      cinematicId: string;
    }) => {
      setLoading(true);
      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReviewData),
        });
        if (res.ok) {
          await refreshReviews();
          setShowReviews(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [refreshReviews]
  );

  return (
    <div className="flex flex-col h-full">
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mb-4 ${
          showReviews
            ? "max-h-0 opacity-0 scale-95"
            : "max-h-[600px] opacity-100 scale-100"
        }`}
      >
        <ReviewForm cinematicId={cinematicId} onSubmit={handleNewReview} />
      </div>
      <div className="flex-shrink-0 mb-4">
        <Button
          onClick={() => setShowReviews(!showReviews)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 flex items-center justify-between"
          variant="outline"
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
            {showReviews ? "Ocultar Reviews" : "Ver Reviews Disponíveis"}
            {reviews.length > 0 && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {reviews.length}
              </span>
            )}
          </span>
          <FontAwesomeIcon
            icon={showReviews ? faChevronUp : faChevronDown}
            className="w-4 h-4"
          />
        </Button>
      </div>

      {showReviews && (
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto pr-2 space-y-4 scrollbar-cinema">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <FontAwesomeIcon
                  icon={faStar}
                  className="w-12 h-12 mb-3 animate-spin"
                />
                <p className="text-center">Carregando reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review as UserReview}
                  cinematicId={cinematicId}
                  onReviewChange={refreshReviews}
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
      {!showReviews && reviews.length > 0 && (
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

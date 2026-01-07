"use client";

import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const RATING_MAX = 5;

interface StarRatingInteractiveProps {
  rating: number | null;
  onRatingChange: (rating: number) => void;
  onRatingHover?: (rating: number | null) => void;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

export function StarRatingInteractive({
  rating,
  onRatingChange,
  onRatingHover,
  size = "md",
  showTooltip = false,
  className = "",
}: StarRatingInteractiveProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleStarClick = useCallback(
    (starIndex: number, isHalf: boolean) => {
      const newRating = starIndex + (isHalf ? 0.5 : 1);
      onRatingChange(newRating);
    },
    [onRatingChange]
  );

  const handleStarHover = useCallback(
    (starIndex: number, isHalf: boolean) => {
      const newRating = starIndex + (isHalf ? 0.5 : 1);
      setHoveredRating(newRating);
      onRatingHover?.(newRating);
    },
    [onRatingHover]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRating(null);
    onRatingHover?.(null);
  }, [onRatingHover]);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-lg";
      case "lg":
        return "text-3xl";
      default:
        return "text-2xl";
    }
  };

  const renderInteractiveStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const currentRatingToDisplay =
      hoveredRating !== null ? hoveredRating : rating || 0;

    const isFull = currentRatingToDisplay >= starValue;
    const isHalf =
      currentRatingToDisplay >= starValue - 0.5 &&
      currentRatingToDisplay < starValue;

    return (
      <div
        key={starIndex}
        className={`relative ${getSizeClasses()} flex items-center`}
        onMouseLeave={handleMouseLeave}
        title={
          showTooltip ? `${starValue} estrela${starValue > 1 ? "s" : ""}` : ""
        }
      >
        {/* Metade esquerda da estrela (0.5) */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full overflow-hidden cursor-pointer flex items-center justify-start z-10"
          onMouseEnter={() => handleStarHover(starIndex, true)}
          onClick={() => handleStarClick(starIndex, true)}
        >
          <FontAwesomeIcon
            icon={isHalf || isFull ? faStar : faStarRegular}
            className={`transition-colors duration-200 ${
              isHalf || isFull ? "text-yellow-400" : "text-gray-500"
            } hover:text-yellow-300`}
          />
        </div>

        {/* Metade direita da estrela (1.0) */}
        <div
          className="absolute left-1/2 top-0 w-1/2 h-full overflow-hidden cursor-pointer flex items-center justify-end z-10"
          onMouseEnter={() => handleStarHover(starIndex, false)}
          onClick={() => handleStarClick(starIndex, false)}
        >
          <FontAwesomeIcon
            icon={isFull ? faStar : faStarRegular}
            className={`transition-colors duration-200 ${
              isFull ? "text-yellow-400" : "text-gray-500"
            } hover:text-yellow-300`}
          />
        </div>

        {/* Estrela de fundo */}
        <FontAwesomeIcon
          icon={faStarRegular}
          className="text-gray-500 pointer-events-none"
        />
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: RATING_MAX }).map((_, idx) =>
        renderInteractiveStar(idx)
      )}
    </div>
  );
}

export { RATING_MAX };

export function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = RATING_MAX - fullStars - (hasHalfStar ? 1 : 0);

  // Estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        className="text-yellow-400"
      />
    );
  }

  // Estrela pela metade
  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarRegular}
        className="text-yellow-400"
      />
    );
  }

  // Estrelas vazias
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`empty-${i}`}
        icon={faStarRegular}
        className="text-gray-500"
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
}

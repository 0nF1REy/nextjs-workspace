"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

export function StarRatingInput({
  rating,
  onRatingChange,
  className = "",
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const handleClick = (starIndex: number, isHalf: boolean) => {
    const newRating = starIndex + (isHalf ? 0.5 : 1);
    onRatingChange(newRating);
  };

  const handleMouseEnter = (starIndex: number, isHalf: boolean) => {
    const newRating = starIndex + (isHalf ? 0.5 : 1);
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const isFilled = displayRating >= starValue;
    const isHalfFilled =
      displayRating >= starIndex + 0.5 && displayRating < starValue;

    return (
      <div key={starIndex} className="relative inline-block cursor-pointer">
        <FontAwesomeIcon
          icon={faStarRegular}
          className={`w-6 h-6 text-gray-400 transition-colors duration-200 ${className}`}
        />

        {isFilled && (
          <FontAwesomeIcon
            icon={faStar}
            className={`absolute top-0 left-0 w-6 h-6 text-yellow-400 transition-colors duration-200 ${className}`}
          />
        )}

        {isHalfFilled && (
          <div className="absolute top-0 left-0 overflow-hidden w-3">
            <FontAwesomeIcon
              icon={faStar}
              className={`w-6 h-6 text-yellow-400 transition-colors duration-200 ${className}`}
            />
          </div>
        )}

        <div className="absolute top-0 left-0 w-full h-full flex">
          <div
            className="w-1/2 h-full"
            onClick={() => handleClick(starIndex, true)}
            onMouseEnter={() => handleMouseEnter(starIndex, true)}
            onMouseLeave={handleMouseLeave}
          />
          <div
            className="w-1/2 h-full"
            onClick={() => handleClick(starIndex, false)}
            onMouseEnter={() => handleMouseEnter(starIndex, false)}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className="ml-2 text-sm text-gray-400">
        {displayRating.toFixed(1)}/5
      </span>
    </div>
  );
}

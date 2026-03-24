"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StarRatingInput({
  rating,
  onRatingChange,
  className = "",
  size = "md",
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

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const isFull = displayRating >= starValue;
    const isHalf =
      displayRating >= starIndex + 0.5 && displayRating < starValue;

    return (
      <div
        key={starIndex}
        className={`relative ${getSizeClasses()} flex items-center cursor-pointer`}
        onMouseLeave={handleMouseLeave}
      >
        {/* Metade esquerda da estrela (0.5) */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full overflow-hidden cursor-pointer flex items-center justify-start z-10"
          onMouseEnter={() => handleMouseEnter(starIndex, true)}
          onClick={() => handleClick(starIndex, true)}
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
          onMouseEnter={() => handleMouseEnter(starIndex, false)}
          onClick={() => handleClick(starIndex, false)}
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
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className="ml-2 text-sm text-gray-400">
        {displayRating.toFixed(1)}/5
      </span>
    </div>
  );
}

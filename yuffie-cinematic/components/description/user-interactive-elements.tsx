"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface UserRating {
  movieId: string;
  rating: number;
  timestamp: number;
}

const RATING_MAX = 5;

const getUserRatingFromStorage = (movieId: string): number | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`movie-rating-${movieId}`);
    return stored ? JSON.parse(stored).rating : null;
  } catch {
    return null;
  }
};

const saveUserRatingToStorage = (movieId: string, rating: number): void => {
  if (typeof window === "undefined") return;
  try {
    const userRating: UserRating = {
      movieId,
      rating,
      timestamp: Date.now(),
    };
    localStorage.setItem(`movie-rating-${movieId}`, JSON.stringify(userRating));
  } catch (error) {
    console.error("Falha ao salvar a classificação:", error);
  }
};

interface UserInteractiveElementsProps {
  cinematicId: string;
  cinematicRating: number;
}

export function UserInteractiveElements({
  cinematicId,
  cinematicRating,
}: UserInteractiveElementsProps) {
  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {}, [cinematicId]);

  useEffect(() => {
    const savedRating = getUserRatingFromStorage(cinematicId);
    if (savedRating !== null) {
      setUserRating(savedRating);
    }
  }, [cinematicId]);

  const handleFavoriteToggle = useCallback(() => {
    setFavorite((prev) => !prev);
  }, []);

  const handleStarClick = useCallback(
    (rating: number) => {
      setUserRating(rating);
      saveUserRatingToStorage(cinematicId, rating);
    },
    [cinematicId]
  );

  const handleStarHover = useCallback((rating: number | null) => {
    setHoveredRating(rating);
  }, []);

  const FavoriteButton = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <Button
          onClick={handleFavoriteToggle}
          aria-pressed={favorite}
          aria-label={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          variant="ghost"
          size="lg"
          className={`group transition-all duration-300 hover:scale-110 ${
            favorite
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-red-400"
          }`}
        >
          <FontAwesomeIcon
            icon={favorite ? faHeart : faHeartRegular}
            className={`w-6 h-6 transition-all duration-300 ${
              favorite
                ? "text-red-500"
                : "text-gray-400 hover:text-red-400 group-hover:scale-110"
            }`}
          />
          <span className="ml-2 text-sm font-medium">
            {favorite ? "Favoritado" : "Favoritar"}
          </span>
        </Button>
      </div>
    ),
    [favorite, handleFavoriteToggle]
  );

  const InteractiveStarRating = useMemo(() => {
    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-300 text-sm">Avaliação Geral:</span>
            <div className="text-yellow-400">
              {Array.from({ length: RATING_MAX }).map((_, idx) => (
                <span key={`general-star-${idx}`} className="text-xl">
                  {idx < cinematicRating ? "★" : "☆"}
                </span>
              ))}
              <span className="text-gray-400 text-sm ml-2">
                {cinematicRating}/{RATING_MAX}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-gray-300 text-sm block mb-1">
            Sua Avaliação:
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: RATING_MAX }).map((_, idx) => {
              const starValue = idx + 1;
              const isActive = hoveredRating
                ? starValue <= hoveredRating
                : userRating !== null && starValue <= userRating;

              return (
                <button
                  key={`user-star-${idx}`}
                  className={`text-2xl transition-colors duration-200 hover:scale-110 transform ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-400"
                  }`}
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => handleStarHover(starValue)}
                  onMouseLeave={() => handleStarHover(null)}
                  aria-label={`Avaliar com ${starValue} estrela${
                    starValue > 1 ? "s" : ""
                  }`}
                >
                  {isActive ? "★" : "☆"}
                </button>
              );
            })}
            {userRating && (
              <>
                <span className="text-gray-400 text-sm ml-2">
                  {userRating}/{RATING_MAX}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 hover:text-gray-300 ml-2"
                  onClick={() => {
                    setUserRating(null);
                    if (typeof window !== "undefined") {
                      localStorage.removeItem(`movie-rating-${cinematicId}`);
                    }
                  }}
                >
                  Remover
                </Button>
              </>
            )}
          </div>
          {userRating && (
            <p className="text-xs text-gray-500 mt-1">
              Avaliação salva localmente
            </p>
          )}
        </div>
      </div>
    );
  }, [
    cinematicId,
    userRating,
    hoveredRating,
    handleStarClick,
    handleStarHover,
    cinematicRating,
  ]);

  return (
    <>
      {InteractiveStarRating}
      <div className="pt-4 flex justify-center md:justify-start">
        {FavoriteButton}
      </div>
    </>
  );
}

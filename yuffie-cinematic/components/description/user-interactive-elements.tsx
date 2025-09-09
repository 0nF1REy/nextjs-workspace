"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Button } from "@/components/ui/button";
import { FavoriteItem } from "@/lib/user/types";
import {
  getUserRatingFromStorage,
  saveUserRatingToStorage,
  getFavoritesFromStorage,
  saveFavoriteToStorage,
  removeFavoriteFromStorage,
  isFavoriteInStorage,
} from "@/lib/user/storage";

import { StarRating } from "./movie-reviews";

const RATING_MAX = 5;

interface UserInteractiveElementsProps {
  cinematicId: string;
  cinematicRating: number;
  cinematicTitle: string;
  cinematicCover: string;
  cinematicType: "movie" | "serie" | "anime";
}

export function UserInteractiveElements({
  cinematicId,
  cinematicRating,
  cinematicTitle,
  cinematicCover,
  cinematicType,
}: UserInteractiveElementsProps) {
  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  // Carregar estado inicial dos favoritos e ratings
  useEffect(() => {
    setFavorite(isFavoriteInStorage(cinematicId));
    const savedRating = getUserRatingFromStorage(cinematicId);
    if (savedRating !== null) {
      setUserRating(savedRating);
    }
  }, [cinematicId]);

  const handleFavoriteToggle = useCallback(() => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);

    if (newFavoriteState) {
      // Adicionar aos favoritos
      const favoriteItem: FavoriteItem = {
        id: cinematicId,
        title: cinematicTitle,
        cover: cinematicCover,
        type: cinematicType,
        timestamp: Date.now(),
      };
      saveFavoriteToStorage(favoriteItem);
    } else {
      removeFavoriteFromStorage(cinematicId);
    }

    // Disparar evento para notificar outros componentes
    if (typeof window !== "undefined") {
      const event = new CustomEvent("favoriteChanged", {
        detail: { cinematicId, favorite: newFavoriteState },
      });
      window.dispatchEvent(event);
    }
  }, [favorite, cinematicId, cinematicTitle, cinematicCover, cinematicType]);

  const handleStarClick = useCallback(
    (starIndex: number, isHalf: boolean) => {
      // Calcula o rating baseado no índice da estrela e se é meia
      const rating = starIndex + (isHalf ? 0.5 : 1);
      setUserRating(rating);
      saveUserRatingToStorage(cinematicId, rating);

      // Disparar evento personalizado para notificar outros componentes
      if (typeof window !== "undefined") {
        const event = new CustomEvent("ratingChanged", {
          detail: { cinematicId, rating },
        });
        window.dispatchEvent(event);
      }
    },
    [cinematicId]
  );

  const handleStarHover = useCallback((starIndex: number, isHalf: boolean) => {
    // Calcula o rating de hover baseado no índice da estrela e se é meia
    const rating = starIndex + (isHalf ? 0.5 : 1);
    setHoveredRating(rating);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredRating(null);
  }, []);

  const handleRemoveRating = useCallback(() => {
    setUserRating(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(`movie-rating-${cinematicId}`);

      // Disparar evento para notificar a remoção do rating
      const event = new CustomEvent("ratingChanged", {
        detail: { cinematicId, rating: null },
      });
      window.dispatchEvent(event);
    }
  }, [cinematicId]);

  const renderInteractiveStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const currentRatingToDisplay =
      hoveredRating !== null ? hoveredRating : userRating || 0;

    // Determina se a estrela deve ser completamente preenchida, meio preenchida ou vazia
    const isFull = currentRatingToDisplay >= starValue;
    const isHalf =
      currentRatingToDisplay >= starValue - 0.5 &&
      currentRatingToDisplay < starValue;

    return (
      <div
        key={starIndex}
        className="relative text-2xl flex items-center"
        onMouseLeave={handleMouseLeave}
      >
        {/* Metade esquerda da estrela (clicável para 0.5 ou 1.5, etc.) */}
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

        {/* Metade direita da estrela (clicável para 1 ou 2, etc.) */}
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

        {/* Estrela de fundo para garantir o espaçamento e a base vazia */}
        <FontAwesomeIcon
          icon={faStarRegular}
          className="text-gray-500 pointer-events-none"
        />
      </div>
    );
  };

  return (
    <>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-300 text-sm">Avaliação Geral:</span>
            <div className="text-yellow-400">
              <StarRating rating={cinematicRating} />
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
            {Array.from({ length: RATING_MAX }).map((_, idx) =>
              renderInteractiveStar(idx)
            )}
            {userRating !== null && (
              <>
                <span className="text-gray-400 text-sm ml-2">
                  {userRating}/{RATING_MAX}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 hover:text-gray-300 ml-2"
                  onClick={handleRemoveRating}
                >
                  Remover
                </Button>
              </>
            )}
          </div>
          {userRating !== null && (
            <p className="text-xs text-gray-500 mt-1">
              Avaliação salva localmente
            </p>
          )}
        </div>
      </div>
      <div className="pt-4 flex justify-center md:justify-start">
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
      </div>
    </>
  );
}

// Função utilitária para ser usada na página de perfil
export const getUserFavorites = (): FavoriteItem[] => {
  return getFavoritesFromStorage();
};

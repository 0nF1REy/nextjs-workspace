"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
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
import { StarRatingInteractive, RATING_MAX } from "./StarRatingInteractive";

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

  const handleStarRatingChange = useCallback(
    (rating: number) => {
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
            <StarRatingInteractive
              rating={userRating}
              onRatingChange={handleStarRatingChange}
              size="md"
              showTooltip={true}
            />
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

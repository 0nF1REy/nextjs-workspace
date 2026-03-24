"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@/components/ui/button";
import { FavoriteItem } from "@/lib/user/types";
import { useFavoritesStore, useRatingsStore } from "@/stores";
import { ClientOnly } from "@/components/client-only";

import {
  StarRating,
  StarRatingInteractive,
  RATING_MAX,
} from "./StarRatingInteractive";

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
  // Zustand stores
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { getRating, setRating, removeRating } = useRatingsStore();

  // Estados que dependem do store
  const favorite = isFavorite(cinematicId);
  const userRating = getRating(cinematicId);

  const handleFavoriteToggle = () => {
    const favoriteItem: FavoriteItem = {
      id: cinematicId,
      title: cinematicTitle,
      cover: cinematicCover,
      type: cinematicType,
      timestamp: Date.now(),
    };

    toggleFavorite(favoriteItem);
  };

  const handleStarRatingChange = (rating: number) => {
    setRating(cinematicId, rating);
  };

  const handleRemoveRating = () => {
    removeRating(cinematicId);
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
            <ClientOnly
              fallback={
                <div className="flex items-center gap-1">
                  {[...Array(RATING_MAX)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStarRegular}
                      className="text-2xl text-gray-500"
                    />
                  ))}
                </div>
              }
            >
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
            </ClientOnly>
          </div>
          <ClientOnly>
            {userRating !== null && (
              <p className="text-xs text-gray-500 mt-1">
                Avaliação salva localmente
              </p>
            )}
          </ClientOnly>
        </div>
      </div>
      <div className="pt-4 flex justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <ClientOnly
            fallback={
              <Button
                variant="ghost"
                size="lg"
                className="group transition-all duration-300 hover:scale-110 text-gray-400"
              >
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  className="w-6 h-6 text-gray-400"
                />
                <span className="ml-2 text-sm font-medium">Favoritar</span>
              </Button>
            }
          >
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
          </ClientOnly>
        </div>
      </div>
    </>
  );
}

// Função utilitária
export const getUserFavorites = (): FavoriteItem[] => {
  return useFavoritesStore.getState().favorites;
};

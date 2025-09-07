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

interface FavoriteItem {
  id: string;
  title: string;
  cover: string;
  type: "movie" | "serie" | "anime";
  timestamp: number;
}

const RATING_MAX = 5;

// Funções para gerenciar ratings no localStorage
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

// Funções para gerenciar favoritos no localStorage
const getFavoritesFromStorage = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("user-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoriteToStorage = (item: FavoriteItem): void => {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = [...favorites, item];
    localStorage.setItem("user-favorites", JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Falha ao salvar favorito:", error);
  }
};

const removeFavoriteFromStorage = (itemId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = favorites.filter((fav) => fav.id !== itemId);
    localStorage.setItem("user-favorites", JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Falha ao remover favorito:", error);
  }
};

const isFavoriteInStorage = (itemId: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const favorites = getFavoritesFromStorage();
    return favorites.some((fav) => fav.id === itemId);
  } catch {
    return false;
  }
};

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
      // Remover dos favoritos
      removeFavoriteFromStorage(cinematicId);
    }
  }, [favorite, cinematicId, cinematicTitle, cinematicCover, cinematicType]);

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

  const handleRemoveRating = useCallback(() => {
    setUserRating(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(`movie-rating-${cinematicId}`);
    }
  }, [cinematicId]);

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
                  onClick={handleRemoveRating}
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
    userRating,
    hoveredRating,
    handleStarClick,
    handleStarHover,
    cinematicRating,
    handleRemoveRating,
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

// Função utilitária para ser usada na página de perfil
export const getUserFavorites = (): FavoriteItem[] => {
  return getFavoritesFromStorage();
};

// Função utilitária para obter todas as avaliações do usuário
export const getUserRatings = (): UserRating[] => {
  if (typeof window === "undefined") return [];
  try {
    const ratings: UserRating[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("movie-rating-")) {
        const stored = localStorage.getItem(key);
        if (stored) {
          ratings.push(JSON.parse(stored));
        }
      }
    }
    return ratings.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
};

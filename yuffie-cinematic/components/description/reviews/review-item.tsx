"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faThumbsUp as faThumbsUpRegular,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { isFavoriteInStorage } from "@/lib/user/storage";
import { StarRating } from "./star-rating";
import { Review, UserReview } from "./types";

interface ReviewItemProps {
  review: (Review | UserReview) & { likes: number; avatarSeed?: string };
  onLike: (reviewId: string) => void;
  isLiked: boolean;
  cinematicId: string;
}

export function ReviewItem({
  review,
  onLike,
  isLiked,
  cinematicId,
}: ReviewItemProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const avatarUrl = review.avatarSeed?.startsWith(
    "/assets/images/profile-avatar/"
  )
    ? review.avatarSeed
    : `https://i.pravatar.cc/300?u=${review.avatarSeed || review.author}`;

  const isUserReview = review.id.startsWith("user-");

  useEffect(() => {
    if (isUserReview) {
      setIsFavorited(isFavoriteInStorage(cinematicId));
    }
  }, [isUserReview, cinematicId]);

  useEffect(() => {
    if (!isUserReview) return;

    const handleFavoriteChanged = (event: CustomEvent) => {
      if (event.detail.cinematicId === cinematicId) {
        setIsFavorited(event.detail.favorite);
      }
    };

    window.addEventListener(
      "favoriteChanged",
      handleFavoriteChanged as EventListener
    );

    return () => {
      window.removeEventListener(
        "favoriteChanged",
        handleFavoriteChanged as EventListener
      );
    };
  }, [isUserReview, cinematicId]);

  return (
    <div className="space-y-4 p-4 bg-black/40 border border-gray-800 rounded-lg shadow-md">
      {/* Header da Review */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={`Avatar de ${review.author}`}
            fill
            className="rounded-full object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <p className="font-semibold text-red-400 text-sm sm:text-base">
            Review por {review.author}
          </p>
          {isUserReview && (
            <FontAwesomeIcon
              icon={isFavorited ? faHeart : faHeartRegular}
              className={`w-4 h-4 ml-2 ${
                isFavorited ? "text-red-500" : "text-gray-400"
              }`}
              title={isFavorited ? "Favoritado" : "Não favoritado"}
            />
          )}
        </div>
        {review.date && (
          <p className="text-xs text-gray-500">
            {new Date(review.date).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>

      {/* Rating */}
      {review.rating && review.rating > 0 && (
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} />
          <span className="text-gray-400 text-sm">{review.rating}/5</span>
        </div>
      )}

      {/* Comentário */}
      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
        &ldquo;{review.content}&rdquo;
      </p>

      {/* Like Button */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(review.id)}
          className={`flex items-center gap-2 text-xs transition-colors ${
            isLiked
              ? "text-blue-400 hover:text-blue-300"
              : "text-gray-400 hover:text-blue-400"
          }`}
        >
          <FontAwesomeIcon
            icon={isLiked ? faThumbsUp : faThumbsUpRegular}
            className="w-4 h-4"
          />
          {isLiked ? "Descurtir" : "Curtir"} review ({review.likes || 0})
        </Button>
      </div>
    </div>
  );
}

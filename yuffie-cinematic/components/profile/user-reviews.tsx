"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalf,
  faCalendar,
  faArrowRight,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { getAllUserReviews } from "@/components/description/reviews/utils";
import { getUserByUsername, getSimulatedUserReviews } from "@/lib/user";
import { getLikedReviewsFromStorage } from "@/lib/user/storage";
import { cinematics } from "@/lib/details";
import { UserReview } from "@/lib/user/types";

interface UserReviewsProps {
  userId: string;
}

function StarRating({ rating }: { rating: number }) {
  const RATING_MAX = 5;
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = RATING_MAX - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        className="text-yellow-400"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalf}
        className="text-yellow-400"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`empty-${i}`}
        icon={faStarOutline}
        className="text-gray-500"
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
}

export default function UserReviews({ userId }: UserReviewsProps) {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(() => {
    try {
      const user = getUserByUsername(userId) || { username: userId };

      // Se for o usuário logado (0nF1REy), usar localStorage
      if (user.username === "0nF1REy") {
        const userReviews = getAllUserReviews().filter(
          (review) => review.author === user.username
        );

        // Obter reviews curtidas do localStorage
        const likedReviewIds = getLikedReviewsFromStorage();

        const typedReviews: UserReview[] = userReviews.map((review) => ({
          id: review.id,
          author: review.author,
          content: review.content,
          rating: review.rating || 0,
          date: review.date || new Date().toISOString(),
          cinematicId: review.cinematicId,
          avatarSeed: review.avatarSeed,
          likes: likedReviewIds.includes(review.id) ? 1 : 0,
        }));
        setReviews(typedReviews);
      } else {
        const simulatedReviews = getSimulatedUserReviews(user.username);
        setReviews(simulatedReviews);
      }
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    // Escutar eventos de atualização de reviews
    const handleReviewsUpdate = () => {
      loadReviews();
    };

    window.addEventListener("userReviewsUpdated", handleReviewsUpdate);

    return () => {
      window.removeEventListener("userReviewsUpdated", handleReviewsUpdate);
    };
  }, [loadReviews]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-gray-800 animate-pulse rounded-lg h-32" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <FontAwesomeIcon
          icon={faStar}
          className="w-16 h-16 text-gray-600 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          Nenhuma review ainda
        </h3>
        <p className="text-gray-500">
          {userId === "0nF1REy"
            ? "Que tal escrever sua primeira review sobre um filme, série ou anime?"
            : "Este usuário ainda não escreveu nenhuma review."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const cinematic = cinematics.find(
          (item) => item.id === review.cinematicId
        );

        return (
          <div
            key={review.id}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-4 md:p-6 hover:border-red-500/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {cinematic && (
                <Link
                  href={`/details/${cinematic.id}`}
                  className="w-full sm:w-auto sm:flex-shrink-0 sm:self-start"
                >
                  <div className="relative w-full h-32 sm:w-16 sm:h-24 rounded-md overflow-hidden hover:scale-105 transition-transform">
                    <Image
                      src={cinematic.cover}
                      alt={cinematic.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 64px"
                    />
                  </div>
                </Link>
              )}

              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    {cinematic && (
                      <Link
                        href={`/details/${cinematic.id}`}
                        className="text-red-400 font-semibold hover:text-red-300 transition-colors block truncate"
                      >
                        {cinematic.title}
                      </Link>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-gray-400 text-sm">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm flex-shrink-0">
                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                    <span>
                      {new Date(review.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                {/* Review content com truncamento responsivo */}
                <div className="text-gray-300 leading-relaxed">
                  <p className="break-words sm:break-normal">
                    <span className="md:hidden line-clamp-3">
                      &ldquo;{review.content}&rdquo;
                    </span>
                    <span className="hidden md:block">
                      &ldquo;{review.content}&rdquo;
                    </span>
                  </p>
                </div>

                <div
                  className={`flex items-center justify-between pt-2 border-t ${
                    (review.likes || 0) > 0
                      ? "border-blue-700/30"
                      : "border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={`w-3 h-3 ${
                        (review.likes || 0) > 0
                          ? "text-blue-400"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`${
                        (review.likes || 0) > 0
                          ? "text-blue-400 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {review.likes || 0}{" "}
                      {(review.likes || 0) === 1 ? "curtida" : "curtidas"}
                    </span>
                  </div>

                  {cinematic && (
                    <Link
                      href={`/details/${cinematic.id}`}
                      className="text-red-400 text-sm hover:text-red-300 transition-colors flex-shrink-0 flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Ver detalhes</span>
                      <span className="sm:hidden">Ver</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-3 h-3"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllUserReviews } from "@/components/description/reviews/utils";
import { getUserByUsername, getSimulatedUserReviews } from "@/lib/user";
import { getLikedReviewsFromStorage } from "@/lib/user/storage";
import { UserReview } from "@/lib/user/types";
import { ProfileReviewItem } from "./profile-review-item";

interface UserReviewsProps {
  userId: string;
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
        <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⭐</span>
        </div>
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
      {reviews.map((review) => (
        <ProfileReviewItem
          key={review.id}
          review={review}
          onReviewUpdated={loadReviews}
        />
      ))}
    </div>
  );
}

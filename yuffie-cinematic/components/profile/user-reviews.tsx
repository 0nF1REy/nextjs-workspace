"use client";

import { useEffect, useState } from "react";
import { useReviewsStore, useUserStore } from "@/stores";
import { getUserByUsername, getSimulatedUserReviews, getCurrentUser } from "@/lib/user";
import { UserReview } from "@/lib/user/types";
import { ProfileReviewItem } from "./profile-review-item";

interface UserReviewsProps {
  userId: string;
}

export default function UserReviews({ userId }: UserReviewsProps) {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Zustand stores
  const reviewsStore = useReviewsStore();
  const { getUsername } = useUserStore();

  useEffect(() => {
    const loadReviews = () => {
      try {
        const user = getUserByUsername(userId) || { username: userId };
        const loggedUser = getCurrentUser();

        // Se for o usuário logado, usar Zustand
        if (loggedUser && user.username === loggedUser.username) {
          const allReviews = reviewsStore.getAllReviews();
          const userReviews = allReviews.filter(
            (review) => review.author === user.username
          );
          setReviews(userReviews);
        } else {
          const simulatedReviews = getSimulatedUserReviews(user.username);
          setReviews(simulatedReviews);
        }
      } catch (error) {
        console.error("Erro ao carregar reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [userId, getUsername, reviewsStore]);

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
          {getCurrentUser()?.username === userId
            ? "Que tal escrever sua primeira review sobre um filme, série ou anime?"
            : "Este usuário ainda não escreveu nenhuma review."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ProfileReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

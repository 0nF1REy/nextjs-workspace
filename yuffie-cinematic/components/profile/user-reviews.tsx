"use client";

import { getCurrentUser } from "@/lib/user/users";
import { UserReview } from "@/lib/user/types";
import { ProfileReviewItem } from "./profile-review-item";

interface UserReviewsProps {
  userId: string;
  initialReviews: UserReview[];
  isLoading: boolean;
  onReviewChange: () => void;
}

export default function UserReviews({
  userId,
  initialReviews,
  isLoading,
  onReviewChange,
}: UserReviewsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="bg-gray-800 animate-pulse rounded-lg h-32" />
        ))}
      </div>
    );
  }

  if (initialReviews.length === 0) {
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
      {initialReviews.map((review) => (
        <ProfileReviewItem
          key={review.id}
          review={review}
          onReviewChange={onReviewChange}
        />
      ))}
    </div>
  );
}

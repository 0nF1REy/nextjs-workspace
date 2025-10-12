"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faThumbsUp as faThumbsUpRegular,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useFavoritesStore, useReviewsStore } from "@/stores";
import { StarRating } from "./star-rating";
import { EditReviewModal } from "./edit-review-modal";
import { DeleteReviewModal } from "./delete-review-modal";
import { ReviewActions } from "./review-actions";
import { Review, UserReview } from "./types";
import { getUserByUsername } from "@/lib/user/users";
import { useUserStore } from "@/stores/useUserStore";

interface ReviewItemProps {
  review: (Review | UserReview) & { likes: number; avatarSeed?: string };
  cinematicId: string;
  onReviewChange?: () => void;
}

export function ReviewItem({
  review,
  cinematicId,
  onReviewChange,
}: ReviewItemProps) {
  const user = getUserByUsername?.(review.author);
  const displayName = user?.displayName || review.author;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const favoritesStore = useFavoritesStore();
  const likedReviewsStore = useReviewsStore();

  const avatarUrl = review.avatarSeed?.startsWith(
    "/assets/images/profile-avatar/"
  )
    ? review.avatarSeed
    : `https://i.pravatar.cc/300?u=${review.avatarSeed || review.author}`;

  const { currentUser } = useUserStore();
  const isUserReview = currentUser && review.author === currentUser.username;
  const isFavorited = isUserReview
    ? favoritesStore.isFavorite(cinematicId)
    : false;

  const [currentLikes, setCurrentLikes] = useState(review.likes || 0);
  const isLikedByCurrentUser = likedReviewsStore.isReviewLiked(review.id);

  const handleEdit = async (content: string, rating: number) => {
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating }),
      });
      if (response.ok) {
        onReviewChange?.();
        setEditOpen(false);
      }
    } catch (error) {
      console.error("Falha ao editar a review:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onReviewChange?.();
        setDeleteOpen(false);
      }
    } catch (error) {
      console.error("Falha ao deletar a review:", error);
    }
  };

  const handleLike = async () => {
    const originalLikes = currentLikes;
    const originalIsLiked = isLikedByCurrentUser;

    setCurrentLikes(originalIsLiked ? originalLikes - 1 : originalLikes + 1);
    likedReviewsStore.toggleLike(review.id);

    try {
      const method = originalIsLiked ? "DELETE" : "POST";
      const res = await fetch(`/api/reviews/${review.id}/like`, { method });

      if (!res.ok) {
        throw new Error("Falha na requisição de like");
      }

      const updatedReview = await res.json();
      setCurrentLikes(updatedReview.likes);
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);

      setCurrentLikes(originalLikes);

      if (likedReviewsStore.isReviewLiked(review.id) !== originalIsLiked) {
        likedReviewsStore.toggleLike(review.id);
      }
    }
  };

  return (
    <div className="space-y-4 p-4 bg-black/40 border border-gray-800 rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <Link
          href={`/profile/${encodeURIComponent(
            user?.username || review.author
          )}`}
          className="relative w-12 h-12 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src={avatarUrl}
            alt={`Avatar de ${review.author}`}
            fill
            className="rounded-full object-cover"
            sizes="48px"
          />
        </Link>
        <div className="flex-1 flex items-center gap-2">
          <p className="font-semibold text-red-400 text-sm sm:text-base">
            Review por{" "}
            <Link
              href={`/profile/${encodeURIComponent(
                user?.username || review.author
              )}`}
              className="hover:text-red-300 transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              {displayName}
            </Link>
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

      {review.rating && review.rating > 0 && (
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} />
          <span className="text-gray-400 text-sm">{review.rating}/5</span>
        </div>
      )}

      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
        &ldquo;{review.content}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center gap-2 text-xs transition-colors ${
            isLikedByCurrentUser
              ? "text-blue-400 hover:text-blue-300"
              : "text-gray-400 hover:text-blue-400"
          }`}
        >
          <FontAwesomeIcon
            icon={isLikedByCurrentUser ? faThumbsUp : faThumbsUpRegular}
            className="w-4 h-4"
          />
          {isLikedByCurrentUser ? "Descurtir" : "Curtir"} review ({currentLikes}{" "}
          {currentLikes === 1 ? "curtida" : "curtidas"})
        </Button>
        <ReviewActions
          showActions={Boolean(isUserReview)}
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      </div>

      <EditReviewModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        initialContent={review.content}
        initialRating={review.rating || 0}
      />

      <DeleteReviewModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

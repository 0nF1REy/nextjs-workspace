"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faArrowRight,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { StarRating } from "@/components/description/reviews/star-rating";
import { EditReviewModal } from "@/components/description/reviews/edit-review-modal";
import { DeleteReviewModal } from "@/components/description/reviews/delete-review-modal";
import { ReviewActions } from "@/components/description/reviews/review-actions";
import {
  updateUserReviewInStorage,
  deleteUserReviewFromStorage,
} from "@/lib/user/storage";
import { cinematics } from "@/lib/details";
import { UserReview } from "@/lib/user/types";

interface ProfileReviewItemProps {
  review: UserReview;
  onReviewUpdated: () => void;
}

export function ProfileReviewItem({
  review,
  onReviewUpdated,
}: ProfileReviewItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const cinematic = cinematics.find((item) => item.id === review.cinematicId);
  const isUserReview = review.id.startsWith("user-");

  const handleEdit = (content: string, rating: number) => {
    if (review.cinematicId) {
      updateUserReviewInStorage(review.cinematicId, review.id, content, rating);
      // Disparar evento para atualizar outros componentes
      window.dispatchEvent(new CustomEvent("userReviewsUpdated"));
      onReviewUpdated();
    }
  };

  const handleDelete = () => {
    if (review.cinematicId) {
      deleteUserReviewFromStorage(review.cinematicId, review.id);
      // Disparar evento para atualizar outros componentes
      window.dispatchEvent(new CustomEvent("userReviewsUpdated"));
      onReviewUpdated();
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-4 md:p-6 hover:border-red-500/30 transition-colors">
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
                <span className="text-gray-400 text-sm">{review.rating}/5</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm flex-shrink-0">
                <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                <span>{new Date(review.date).toLocaleDateString("pt-BR")}</span>
              </div>

              {/* Botões de ação apenas para reviews do usuário */}
              <ReviewActions
                showActions={isUserReview}
                onEdit={() => setEditOpen(true)}
                onDelete={() => setDeleteOpen(true)}
              />
            </div>
          </div>

          {/* Review content */}
          <div className="text-gray-300 leading-relaxed">
            <p className="break-words sm:break-normal">
              &ldquo;{review.content}&rdquo;
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={`w-3 h-3 ${
                  (review.likes || 0) > 0 ? "text-blue-400" : "text-gray-500"
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
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modais reutilizáveis */}
      <EditReviewModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        initialContent={review.content}
        initialRating={review.rating}
      />

      <DeleteReviewModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

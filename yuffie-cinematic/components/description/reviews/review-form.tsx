"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores";
import { useRatingsStore } from "@/stores";
import { getContentType, formatContentTypeWithArticle } from "@/lib/utils";
import { UserReview } from "./types";

const reviewSchema = z.object({
  content: z
    .string()
    .min(15, "Sua review deve ter pelo menos 15 caracteres.")
    .max(500, "A review não pode exceder 500 caracteres."),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  cinematicId: string;
  onSubmit: (review: UserReview) => void;
}

export function ReviewForm({ cinematicId, onSubmit }: ReviewFormProps) {
  // Zustand store
  const { getRating } = useRatingsStore();
  const { currentUser } = useUserStore();

  const userRating = getRating(cinematicId);
  const username = currentUser?.username || "anonymous";
  const userAvatarUrl =
    currentUser?.avatar || "/assets/images/profile-avatar/default.png";

  const contentType = getContentType(cinematicId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
    },
  });

  const watchedContent = watch("content");

  const onFormSubmit = (data: ReviewFormData) => {
    if (userRating === null || userRating === 0) {
      return;
    }

    const newReview: UserReview = {
      id: `user-${Date.now()}`,
      author: username,
      content: data.content.trim(),
      rating: userRating,
      date: new Date().toISOString(),
      cinematicId,
      avatarSeed:
        currentUser?.avatar || "/assets/images/profile-avatar/default.png",
      likes: 0,
    };

    onSubmit(newReview);
    reset();
  };

  return (
    <div className="bg-black/40 border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={userAvatarUrl}
            alt={`Avatar de ${username}`}
            fill
            className="rounded-full object-cover"
            sizes="40px"
          />
        </div>
        <h3 className="text-lg font-semibold text-red-400">
          Escreva sua review, {username}!
        </h3>
      </div>

      {(!userRating || userRating === 0) && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3">
          <p className="text-yellow-400 text-sm flex items-center gap-2">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="w-4 h-4 text-yellow-400"
            />
            Você precisa avaliar {formatContentTypeWithArticle(contentType)}{" "}
            antes de escrever uma review.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Sua review
          </label>
          <textarea
            id="content"
            {...register("content")}
            className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 min-h-[100px] resize-vertical ${
              errors.content
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-red-500"
            }`}
            placeholder={`Escreva sua opinião sobre ${formatContentTypeWithArticle(
              contentType
            )}...`}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.content ? (
              <p className="text-red-500 text-xs">{errors.content.message}</p>
            ) : (
              <span></span>
            )}
            <p className="text-xs text-gray-500">
              {watchedContent.length}/500 caracteres
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={isSubmitting || !userRating || userRating === 0}
        >
          {isSubmitting ? "Publicando..." : "Publicar Review"}
        </Button>
      </form>
    </div>
  );
}

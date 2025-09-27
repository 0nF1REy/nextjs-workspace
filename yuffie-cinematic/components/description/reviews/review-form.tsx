"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { getCurrentUser, getLoggedUsername } from "@/lib/user";
import { getUserRatingFromStorage } from "@/lib/user/storage";
import { getContentType, formatContentTypeWithArticle } from "./utils";
import { UserReview } from "./types";

interface ReviewFormProps {
  cinematicId: string;
  onSubmit: (review: UserReview) => void;
}

export function ReviewForm({ cinematicId, onSubmit }: ReviewFormProps) {
  const [content, setContent] = useState("");
  const [userRating, setUserRating] = useState<number | null>(null);

  const currentUser = getCurrentUser();
  const username = currentUser?.username || getLoggedUsername();
  const userAvatarUrl =
    currentUser?.avatar || `https://i.pravatar.cc/300?u=${username}`;

  // Detectar tipo de conteúdo dinamicamente
  const contentType = getContentType(cinematicId);

  useEffect(() => {
    const rating = getUserRatingFromStorage(cinematicId);
    setUserRating(rating);
  }, [cinematicId]);

  useEffect(() => {
    const handleRatingChanged = (event: CustomEvent) => {
      if (event.detail.cinematicId === cinematicId) {
        setUserRating(getUserRatingFromStorage(cinematicId));
      }
    };

    window.addEventListener(
      "ratingChanged",
      handleRatingChanged as EventListener
    );

    return () => {
      window.removeEventListener(
        "ratingChanged",
        handleRatingChanged as EventListener
      );
    };
  }, [cinematicId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Por favor, escreva sua review.");
      return;
    }

    if (userRating === null || userRating === 0) {
      alert(`Por favor, avalie o ${contentType} antes de enviar sua review.`);
      return;
    }

    const newReview: UserReview = {
      id: `user-${Date.now()}`,
      author: username,
      content: content.trim(),
      rating: userRating,
      date: new Date().toISOString(),
      cinematicId,
      avatarSeed: currentUser?.avatar || username,
      likes: 0,
    };

    onSubmit(newReview);
    setContent("");
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

      {/* Aviso se não houver avaliação */}
      {(!userRating || userRating === 0) && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3">
          <p className="text-yellow-400 text-sm flex items-center gap-2">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="w-4 h-4 text-yellow-400"
            />
            Você precisa avaliar {formatContentTypeWithArticle(contentType)}{" "}
            antes de escrever uma review. Use as estrelas na seção principal
            para dar sua nota.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Sua review
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px] resize-vertical"
            placeholder={`Escreva sua opinião sobre ${formatContentTypeWithArticle(
              contentType
            )}...`}
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.length}/500 caracteres
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!content.trim() || !userRating || userRating === 0}
        >
          Publicar Review
        </Button>
      </form>
    </div>
  );
}

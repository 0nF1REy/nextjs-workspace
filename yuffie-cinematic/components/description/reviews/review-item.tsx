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
import { StarRatingInput } from "./star-rating-input";
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
  onEdit,
  onDelete,
}: ReviewItemProps & {
  onEdit?: (reviewId: string, content: string, rating: number) => void;
  onDelete?: (reviewId: string) => void;
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editContent, setEditContent] = useState(review.content);
  const [editRating, setEditRating] = useState(review.rating || 0);

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

  // Handler para editar
  const handleEdit = () => {
    if (onEdit) {
      onEdit(review.id, editContent, editRating);
      setEditOpen(false);
    }
  };

  // Handler para excluir
  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
      setDeleteOpen(false);
    }
  };

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

      {/* Like Button e ações do usuário */}
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
          {isLiked ? "Descurtir" : "Curtir"} review ({review.likes || 0}{" "}
          {(review.likes || 0) === 1 ? "curtida" : "curtidas"})
        </Button>
        {isUserReview && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-400 border-yellow-400 hover:bg-yellow-100/10"
              onClick={() => setEditOpen(true)}
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-100/10"
              onClick={() => setDeleteOpen(true)}
            >
              Excluir
            </Button>
          </div>
        )}
      </div>

      {/* Modal de edição */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">
              Editar Review
            </h3>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2 font-medium">
                Sua review:
              </label>
              <textarea
                className={`w-full p-3 rounded bg-gray-800 text-gray-100 border resize-none focus:outline-none transition-colors ${
                  editContent.length < 15
                    ? "border-red-500 focus:border-red-400"
                    : "border-gray-700 focus:border-yellow-400"
                }`}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                minLength={15}
                maxLength={500}
                placeholder="Escreva sua review aqui..."
              />

              {/* Contador de caracteres e validação */}
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm">
                  {editContent.length < 15 ? (
                    <span className="text-red-400">
                      Mínimo 15 caracteres (faltam {15 - editContent.length})
                    </span>
                  ) : (
                    <span className="text-green-400">✓ Review válida</span>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {editContent.length}/500
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">
                Sua avaliação:
              </label>
              <StarRatingInput
                rating={editRating}
                onRatingChange={setEditRating}
                size="md"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditOpen(false)}
                className="px-4"
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                size="sm"
                className={`px-4 transition-all duration-200 ${
                  editContent.length < 15
                    ? "bg-gray-600 hover:bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}
                onClick={handleEdit}
                disabled={editContent.length < 15}
                title={
                  editContent.length < 15
                    ? "Sua review deve ter pelo menos 15 caracteres"
                    : "Salvar alterações"
                }
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">
              Excluir Review
            </h3>
            <p className="text-gray-300 mb-4">
              Tem certeza que deseja excluir esta review? Esta ação não pode ser
              desfeita.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeleteOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

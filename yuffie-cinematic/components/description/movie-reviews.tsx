"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faChevronDown,
  faChevronUp,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { getCurrentUser, getLoggedUsername } from "@/lib/user";
import { Review } from "@/lib/details/types";
import { UserReview } from "@/lib/user/types";
import {
  getUserReviewsFromStorage,
  saveUserReviewToStorage,
  getLikedReviewsFromStorage,
  saveLikedReviewToStorage,
  removeLikedReviewFromStorage,
  getUserRatingFromStorage,
  isFavoriteInStorage,
} from "@/lib/user/storage";
import { RATING_MAX } from "./StarRatingInteractive";

interface MovieDetailsProps {
  genre?: string[];
  duration?: number;
}

export const getAllUserReviews = (): UserReview[] => {
  return getUserReviewsFromStorage();
};

function MovieDetails({ genre, duration }: MovieDetailsProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-red-500">Detalhes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {genre && (
          <div>
            <span className="font-semibold">Gênero: </span>
            {genre.join(", ")}
          </div>
        )}
        {duration && (
          <div>
            <span className="font-semibold">Duração: </span>
            {duration} minutos
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = RATING_MAX - fullStars - (hasHalfStar ? 1 : 0);

  // Estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`full-${i}`}
        icon={faStar}
        className="text-yellow-400"
      />
    );
  }

  // Estrela pela metade
  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        key="half"
        icon={faStarHalfStroke}
        className="text-yellow-400"
      />
    );
  }

  // Estrelas vazias
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={`empty-${i}`}
        icon={faStarRegular}
        className="text-gray-500"
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
}

function ReviewItem({
  review,
  onLike,
  isLiked,
  cinematicId,
}: {
  review: (Review | UserReview) & { likes: number; avatarSeed?: string };
  onLike: (reviewId: string) => void;
  isLiked: boolean;
  cinematicId: string;
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  const avatarUrl = review.avatarSeed?.startsWith("/assets/images/profile-avatar/")
    ? review.avatarSeed
    : `https://i.pravatar.cc/300?u=${review.avatarSeed || review.author}`;

  // Verifica se o review é do usuário
  const isUserReview = review.id.startsWith("user-");

  // Carregar estado inicial do favorito
  useEffect(() => {
    if (isUserReview) {
      setIsFavorited(isFavoriteInStorage(cinematicId));
    }
  }, [isUserReview, cinematicId]);

  // Escutar mudanças de favorito
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
              ? "text-red-400 hover:text-red-300"
              : "text-gray-400 hover:text-red-400"
          }`}
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeart : faHeartRegular}
            className="w-4 h-4"
          />
          Like review ({review.likes || 0})
        </Button>
      </div>
    </div>
  );
}

function ReviewForm({
  cinematicId,
  onSubmit,
}: {
  cinematicId: string;
  onSubmit: (review: UserReview) => void;
}) {
  const [content, setContent] = useState("");
  const [userRating, setUserRating] = useState<number | null>(null);

  const currentUser = getCurrentUser();
  const username = currentUser?.username || getLoggedUsername();
  const userAvatarUrl =
    currentUser?.avatar || `https://i.pravatar.cc/300?u=${username}`;

  // Carrega o rating do usuário ao montar o componente
  useEffect(() => {
    const rating = getUserRatingFromStorage(cinematicId);
    setUserRating(rating);
  }, [cinematicId]);

  // Escuta o evento 'ratingChanged' para atualizar o userRating
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
      alert(
        "Por favor, avalie o filme/série/anime antes de enviar sua review."
      );
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
            Você precisa avaliar o filme/série/anime antes de escrever uma
            review. Use as estrelas na seção principal para dar sua nota.
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
            placeholder="Escreva sua opinião sobre este filme/série/anime..."
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

function ReviewsList({
  reviews,
  cinematicId,
  onNewReview,
}: {
  reviews: Review[];
  cinematicId: string;
  onNewReview: (review: UserReview) => void;
}) {
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    setUserReviews(getUserReviewsFromStorage(cinematicId));
    setLikedReviews(getLikedReviewsFromStorage());
  }, [cinematicId]);

  // Escuta mudanças de favorito para atualizar as reviews do usuário
  useEffect(() => {
    const handleFavoriteChanged = (event: CustomEvent) => {
      if (event.detail.cinematicId === cinematicId) {
        setUserReviews(getUserReviewsFromStorage(cinematicId));
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
  }, [cinematicId]);

  const handleLike = useCallback(
    (reviewId: string) => {
      const isCurrentlyLiked = likedReviews.includes(reviewId);

      if (isCurrentlyLiked) {
        removeLikedReviewFromStorage(reviewId);
        setLikedReviews((prev) => prev.filter((id) => id !== reviewId));
      } else {
        saveLikedReviewToStorage(reviewId);
        setLikedReviews((prev) => [...prev, reviewId]);
      }
    },
    [likedReviews]
  );

  const handleNewReview = useCallback(
    (newReview: UserReview) => {
      saveUserReviewToStorage(cinematicId, newReview);
      setUserReviews((prev) => [...prev, newReview]);
      onNewReview(newReview);
      setShowReviews(true);
    },
    [cinematicId, onNewReview]
  );

  // Combinar reviews padrão com reviews do usuário
  const allReviews = [
    ...reviews.map((r) => ({ ...r, likes: 0, avatarSeed: r.author })),
    ...userReviews,
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Formulário de review */}
      <div className="flex-shrink-0 mb-4">
        <ReviewForm cinematicId={cinematicId} onSubmit={handleNewReview} />
      </div>

      {/* Botão para mostrar/ocultar reviews */}
      <div className="flex-shrink-0 mb-4">
        <Button
          onClick={() => setShowReviews(!showReviews)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 flex items-center justify-between"
          variant="outline"
        >
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
            {showReviews ? "Ocultar Reviews" : "Ver Reviews Disponíveis"}
            {allReviews.length > 0 && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {allReviews.length}
              </span>
            )}
          </span>
          <FontAwesomeIcon
            icon={showReviews ? faChevronUp : faChevronDown}
            className="w-4 h-4"
          />
        </Button>
      </div>

      {/* Container com scroll para as reviews */}
      {showReviews && (
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {allReviews.length > 0 ? (
              allReviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  review={review}
                  onLike={handleLike}
                  isLiked={likedReviews.includes(review.id)}
                  cinematicId={cinematicId}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <FontAwesomeIcon icon={faStar} className="w-12 h-12 mb-3" />
                <p className="text-center">
                  Nenhuma review ainda. Seja o primeiro a avaliar!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Placeholder quando reviews estão ocultas */}
      {!showReviews && allReviews.length > 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <FontAwesomeIcon icon={faStar} className="w-8 h-8 mb-2" />
            <p className="text-sm">
              Clique em &ldquo;Ver Reviews Disponíveis&rdquo; para ler as
              avaliações
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MovieReviews({
  genre,
  duration,
  reviews,
  cinematicId,
}: MovieDetailsProps & {
  reviews: Review[];
  cinematicId: string;
}) {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleNewReview = useCallback(() => {}, []);

  return (
    <aside className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 rounded-xl p-6 shadow-lg h-[600px] flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col"
      >
        <TabsList className="grid grid-cols-2 gap-2 mb-6 flex-shrink-0">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg"
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="flex-1 min-h-0">
          <MovieDetails genre={genre} duration={duration} />
        </TabsContent>

        <TabsContent value="reviews" className="flex-1 min-h-0">
          <ReviewsList
            reviews={reviews}
            cinematicId={cinematicId}
            onNewReview={handleNewReview}
          />
        </TabsContent>
      </Tabs>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #374151;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </aside>
  );
}

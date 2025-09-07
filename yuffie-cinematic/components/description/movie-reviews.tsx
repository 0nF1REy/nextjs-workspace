"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

interface MovieDetailsProps {
  genre?: string[];
  duration?: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating?: number;
  date?: string;
  avatarSeed?: string;
  likes?: number;
}

interface UserReview {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  cinematicId: string;
  avatarSeed: string;
  likes: number;
}

const RATING_MAX = 5;
const LOGGED_USER = "Alan Ryan";

// Funções para gerenciar reviews no localStorage
const getUserReviewsFromStorage = (cinematicId: string): UserReview[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(`user-reviews-${cinematicId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveUserReviewToStorage = (
  cinematicId: string,
  review: UserReview
): void => {
  if (typeof window === "undefined") return;
  try {
    const existingReviews = getUserReviewsFromStorage(cinematicId);
    const updatedReviews = [...existingReviews, review];
    localStorage.setItem(
      `user-reviews-${cinematicId}`,
      JSON.stringify(updatedReviews)
    );
  } catch (error) {
    console.error("Falha ao salvar a review:", error);
  }
};

const getLikedReviewsFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("liked-reviews");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveLikedReviewToStorage = (reviewId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const likedReviews = getLikedReviewsFromStorage();
    if (!likedReviews.includes(reviewId)) {
      likedReviews.push(reviewId);
      localStorage.setItem("liked-reviews", JSON.stringify(likedReviews));
    }
  } catch (error) {
    console.error("Falha ao salvar like:", error);
  }
};

const removeLikedReviewFromStorage = (reviewId: string): void => {
  if (typeof window === "undefined") return;
  try {
    const likedReviews = getLikedReviewsFromStorage();
    const updatedLikes = likedReviews.filter((id) => id !== reviewId);
    localStorage.setItem("liked-reviews", JSON.stringify(updatedLikes));
  } catch (error) {
    console.error("Falha ao remover like:", error);
  }
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

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
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
        icon={faStarHalf}
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
}: {
  review: Review & { likes: number };
  onLike: (reviewId: string) => void;
  isLiked: boolean;
}) {
  const avatarUrl = `https://i.pravatar.cc/300?u=${
    review.avatarSeed || review.author
  }`;

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
        <div className="flex-1">
          <p className="font-semibold text-red-400 text-sm sm:text-base">
            Review by {review.author}
          </p>
          {review.date && (
            <p className="text-xs text-gray-500">
              {new Date(review.date).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>

      {/* Rating e Coração */}
      <div className="flex items-center gap-3">
        {review.rating && <StarRating rating={review.rating} />}
        <FontAwesomeIcon icon={faHeart} className="text-red-500 w-4 h-4" />
      </div>

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
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || rating === 0) {
      alert("Por favor, escreva sua review e dê uma avaliação.");
      return;
    }

    const newReview: UserReview = {
      id: `user-${Date.now()}`,
      author: LOGGED_USER,
      content: content.trim(),
      rating,
      date: new Date().toISOString(),
      cinematicId,
      avatarSeed: LOGGED_USER,
      likes: 0,
    };

    onSubmit(newReview);

    // Limpar formulário
    setContent("");
    setRating(0);
    setHoveredRating(0);
  };

  return (
    <div className="bg-black/40 border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={`https://i.pravatar.cc/300?u=${LOGGED_USER}`}
            alt={`Avatar de ${LOGGED_USER}`}
            fill
            className="rounded-full object-cover"
            sizes="40px"
          />
        </div>
        <h3 className="text-lg font-semibold text-red-400">
          Escreva sua review, {LOGGED_USER.split(" ")[0]}!
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sua avaliação
          </label>
          <div className="flex gap-1">
            {Array.from({ length: RATING_MAX }).map((_, idx) => {
              const starValue = idx + 1;
              const isActive = hoveredRating
                ? starValue <= hoveredRating
                : starValue <= rating;

              return (
                <button
                  key={`rating-star-${idx}`}
                  type="button"
                  className={`text-2xl transition-colors duration-200 hover:scale-110 ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-500 hover:text-yellow-400"
                  }`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <FontAwesomeIcon icon={isActive ? faStar : faStarRegular} />
                </button>
              );
            })}
          </div>
        </div>

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
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled={!content.trim() || rating === 0}
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

  useEffect(() => {
    setUserReviews(getUserReviewsFromStorage(cinematicId));
    setLikedReviews(getLikedReviewsFromStorage());
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
    },
    [cinematicId, onNewReview]
  );

  // Combinar reviews padrão com reviews do usuário
  const allReviews = [
    ...reviews.map((r) => ({ ...r, likes: 0, avatarSeed: r.author })),
    ...userReviews,
  ];

  return (
    <div className="space-y-6">
      <ReviewForm cinematicId={cinematicId} onSubmit={handleNewReview} />

      <div className="space-y-4">
        {allReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onLike={handleLike}
            isLiked={likedReviews.includes(review.id)}
          />
        ))}
      </div>
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

  const handleNewReview = useCallback((review: UserReview) => {
    // Callback para quando uma nova review é adicionada
    console.log("Nova review adicionada:", review);
  }, []);

  return (
    <aside className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 rounded-xl p-6 shadow-lg">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 gap-2 mb-6">
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
        <TabsContent value="details">
          <MovieDetails genre={genre} duration={duration} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsList
            reviews={reviews}
            cinematicId={cinematicId}
            onNewReview={handleNewReview}
          />
        </TabsContent>
      </Tabs>
    </aside>
  );
}

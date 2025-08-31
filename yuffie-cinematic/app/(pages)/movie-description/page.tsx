"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  director: string;
  cover: string;
  cast: string[];
  carouselImages: string[];
  rating: number;
  genre?: string[];
  duration?: number;
}

interface SimilarMovie {
  id: string;
  title: string;
  cover: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating?: number;
  date?: string;
}

interface UserRating {
  movieId: string;
  rating: number;
  timestamp: number;
}

const RATING_MAX = 5;
const DEFAULT_IMAGE_DIMENSIONS = {
  carousel: { width: 800, height: 300 },
  cover: { width: 230, height: 345 },
  similar: { width: 160, height: 240 },
};

const getUserRatingFromStorage = (movieId: string): number | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(`movie-rating-${movieId}`);
    return stored ? JSON.parse(stored).rating : null;
  } catch {
    return null;
  }
};

const saveUserRatingToStorage = (movieId: string, rating: number): void => {
  if (typeof window === "undefined") return;

  try {
    const userRating: UserRating = {
      movieId,
      rating,
      timestamp: Date.now(),
    };
    localStorage.setItem(`movie-rating-${movieId}`, JSON.stringify(userRating));
  } catch (error) {
    console.error("Failed to save rating:", error);
  }
};

export default function MovieDescriptionPage() {
  const movie: Movie = useMemo(
    () => ({
      id: "1",
      title: "A Time to Kill",
      synopsis:
        "Um jovem advogado defende um homem negro acusado de assassinar dois homens brancos que estupraram sua filha de 10 anos, provocando o renascimento da Ku Klux Klan.",
      year: 1996,
      director: "Joel Schumacher",
      cover: "/assets/images/movies/a-time-to-kill-1996.jpg",
      cast: [
        "Matthew McConaughey",
        "Sandra Bullock",
        "Samuel L. Jackson",
        "Kevin Spacey",
      ],
      carouselImages: ["/assets/images/a-time-to-kill-banner.jpg"],
      rating: 4,
      genre: ["Drama", "Crime", "Thriller"],
      duration: 149,
    }),
    []
  );

  const similarMovies: SimilarMovie[] = useMemo(
    () => [
      {
        id: "2",
        title: "The Godfather",
        cover: "/assets/images/movies/the-godfather-1972.jpg",
      },
      {
        id: "3",
        title: "The Shawshank Redemption",
        cover: "/assets/images/movies/the-shawshank-redemption-1994.jpg",
      },
      {
        id: "4",
        title: "Amadeus",
        cover: "/assets/images/movies/amadeus-1984.jpg",
      },
    ],
    []
  );

  const reviews: Review[] = useMemo(
    () => [
      {
        id: "1",
        author: "Bethany",
        content: "This movie grabbed me by the throat...",
        rating: 5,
      },
      {
        id: "2",
        author: "Fatima Al Mutairi",
        content: "Kevin Spacey defending child rapists...",
        rating: 4,
      },
    ],
    []
  );

  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    const savedRating = getUserRatingFromStorage(movie.id);
    if (savedRating !== null) {
      setUserRating(savedRating);
    }
  }, [movie.id]);

  const handleFavoriteToggle = useCallback(() => {
    setFavorite((prev) => !prev);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleStarClick = useCallback(
    (rating: number) => {
      setUserRating(rating);
      saveUserRatingToStorage(movie.id, rating);
    },
    [movie.id]
  );

  const handleStarHover = useCallback((rating: number | null) => {
    setHoveredRating(rating);
  }, []);

  const MovieCarousel = useMemo(
    () => (
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-4xl">
          <Carousel className="rounded-2xl overflow-hidden shadow-2xl">
            <CarouselContent>
              {movie.carouselImages.map((img, idx) => (
                <CarouselItem key={`${movie.id}-carousel-${idx}`}>
                  <div className="relative h-64 md:h-80 lg:h-96 w-full flex justify-center">
                    <Image
                      src={img}
                      alt={`${movie.title} scene ${idx + 1}`}
                      width={DEFAULT_IMAGE_DIMENSIONS.carousel.width}
                      height={DEFAULT_IMAGE_DIMENSIONS.carousel.height}
                      priority={idx === 0}
                      className="h-full w-auto object-contain rounded-lg max-w-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-red-700/80 text-white hover:bg-red-600" />
            <CarouselNext className="bg-red-700/80 text-white hover:bg-red-600" />
          </Carousel>
        </div>
      </div>
    ),
    [movie.carouselImages, movie.id, movie.title]
  );

  const InteractiveStarRating = useMemo(
    () => (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-300 text-sm">Avaliação Geral:</span>
            <div className="text-yellow-400">
              {Array.from({ length: RATING_MAX }).map((_, idx) => (
                <span key={`general-star-${idx}`} className="text-xl">
                  {idx < movie.rating ? "★" : "☆"}
                </span>
              ))}
              <span className="text-gray-400 text-sm ml-2">
                {movie.rating}/{RATING_MAX}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-gray-300 text-sm block mb-1">
            Sua Avaliação:
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: RATING_MAX }).map((_, idx) => {
              const starValue = idx + 1;
              const isActive = hoveredRating
                ? starValue <= hoveredRating
                : userRating !== null && starValue <= userRating;

              return (
                <button
                  key={`user-star-${idx}`}
                  className={`text-2xl transition-colors duration-200 hover:scale-110 transform ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-400"
                  }`}
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => handleStarHover(starValue)}
                  onMouseLeave={() => handleStarHover(null)}
                  aria-label={`Avaliar com ${starValue} estrela${
                    starValue > 1 ? "s" : ""
                  }`}
                >
                  {isActive ? "★" : "☆"}
                </button>
              );
            })}
            {userRating && (
              <>
                <span className="text-gray-400 text-sm ml-2">
                  {userRating}/{RATING_MAX}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 hover:text-gray-300 ml-2"
                  onClick={() => {
                    setUserRating(null);
                    if (typeof window !== "undefined") {
                      localStorage.removeItem(`movie-rating-${movie.id}`);
                    }
                  }}
                >
                  Remover
                </Button>
              </>
            )}
          </div>
          {userRating && (
            <p className="text-xs text-gray-500 mt-1">
              Avaliação salva localmente
            </p>
          )}
        </div>
      </div>
    ),
    [
      movie.rating,
      movie.id,
      userRating,
      hoveredRating,
      handleStarClick,
      handleStarHover,
    ]
  );

  const MovieDetails = useMemo(
    () => (
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-red-500">Detalhes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {movie.genre && (
            <div>
              <span className="font-semibold">Gênero: </span>
              {movie.genre.join(", ")}
            </div>
          )}
          {movie.duration && (
            <div>
              <span className="font-semibold">Duração: </span>
              {movie.duration} minutos
            </div>
          )}
        </CardContent>
      </Card>
    ),
    [movie.genre, movie.duration]
  );

  const ReviewsList = useMemo(
    () => (
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-black/40 border border-gray-800 p-4 rounded-lg shadow-md"
          >
            <p className="font-semibold text-red-500">{review.author}</p>
            <p className="italic text-gray-300">
              &ldquo;{review.content}&rdquo;
            </p>
            {review.rating && (
              <div className="text-yellow-400">
                {Array.from({ length: RATING_MAX }).map((_, idx) => (
                  <span key={`review-${review.id}-star-${idx}`}>
                    {idx < review.rating! ? "★" : "☆"}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    [reviews]
  );

  const SimilarMovieCard = ({
    movie: similarMovie,
  }: {
    movie: SimilarMovie;
  }) => (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-lg hover:scale-105 transition-transform">
      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <Image
          src={similarMovie.cover}
          alt={similarMovie.title}
          width={DEFAULT_IMAGE_DIMENSIONS.similar.width}
          height={DEFAULT_IMAGE_DIMENSIONS.similar.height}
          className="object-cover w-full h-full"
        />
      </div>
      <CardFooter className="p-3">
        <div className="w-full text-center">
          <p className="text-xs font-medium text-gray-200 truncate">
            {similarMovie.title}
          </p>
        </div>
      </CardFooter>
    </Card>
  );

  const SimilarMoviesSection = useMemo(
    () => (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Filmes Semelhantes
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {similarMovies.map((similarMovie) => (
            <SimilarMovieCard key={similarMovie.id} movie={similarMovie} />
          ))}
        </div>
      </section>
    ),
    [similarMovies]
  );

  const FavoriteButton = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <Button
          onClick={handleFavoriteToggle}
          aria-pressed={favorite}
          aria-label={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          variant="ghost"
          size="lg"
          className={`group transition-all duration-300 hover:scale-110 ${
            favorite
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-red-400"
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              favorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-400 group-hover:scale-110"
            }`}
          />
          <span className="ml-2 text-sm font-medium">
            {favorite ? "Favoritado" : "Favoritar"}
          </span>
        </Button>
      </div>
    ),
    [favorite, handleFavoriteToggle]
  );

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 px-4 py-8">
      {/* Carrossel */}
      <section aria-label="Movie gallery">{MovieCarousel}</section>

      {/* Cartão de detalhes do filme */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-red-900/40 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <Image
                src={movie.cover}
                alt={`${movie.title} movie poster`}
                width={DEFAULT_IMAGE_DIMENSIONS.cover.width}
                height={DEFAULT_IMAGE_DIMENSIONS.cover.height}
                priority
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Infos */}
            <div className="flex flex-col justify-between flex-1">
              <CardHeader>
                <CardTitle className="text-2xl text-red-500">
                  {movie.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {movie.year} • Dirigido por {movie.director}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300">{movie.synopsis}</p>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Avaliações */}
                  <div>{InteractiveStarRating}</div>

                  {/* Elenco Principal */}
                  <div>
                    <span className="font-semibold text-gray-200 block mb-2">
                      Elenco Principal:
                    </span>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {movie.cast.map((actor, idx) => (
                        <li key={`${movie.id}-cast-${idx}`} className="text-sm">
                          {actor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botão Favoritar */}
                <div className="pt-2">{FavoriteButton}</div>
              </CardContent>
            </div>
          </div>

          <CardFooter>
            <Link href="/">
              <Button
                variant="secondary"
                size="lg"
                className="hover:bg-red-600"
              >
                ← Voltar para Home
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Resenhas */}
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
                Resenhas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">{MovieDetails}</TabsContent>
            <TabsContent value="reviews">{ReviewsList}</TabsContent>
          </Tabs>
        </aside>
      </main>

      {/* Filmes Similares */}
      {SimilarMoviesSection}
    </div>
  );
}

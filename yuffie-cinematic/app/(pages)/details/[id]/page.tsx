"use client";

import { useState, useCallback, useMemo, useEffect, use } from "react";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import ImageGallery from "@/components/description/image-gallery";
import MovieReviews from "@/components/description/movie-reviews";
import SeasonEpisodes from "@/components/description/season-episodes";

import { cinematics } from "@/lib/details";

import NotFoundPage from "@/app/not-found";

interface CinematicItem {
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

interface RollingCoversProps {
  items: CinematicItem[];
  speed?: number;
}

const RollingCovers = ({ items, speed = 30 }: RollingCoversProps) => {
  if (!items || items.length === 0) return null;

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-6 bg-gradient-to-r from-transparent via-red-900/10 to-transparent">
      <div
        className="flex gap-4 animate-scroll"
        style={{
          animationDuration: `${speed}s`,
          width: `${duplicatedItems.length * 170}px`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={`/details/${encodeURIComponent(item.id)}`}
            className="flex-shrink-0"
          >
            <div className="group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="relative w-[110px] h-[100px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                  sizes="150px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-medium truncate">{item.title}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${items.length * 170}px);
          }
        }
        .animate-scroll {
          animation: scroll ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

const RATING_MAX = 5;
const DEFAULT_IMAGE_DIMENSIONS = {
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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CinematicDescriptionPage({ params }: PageProps) {
  const { id } = use(params);

  const cinematic = useMemo(() => {
    const decodedId = decodeURIComponent(id);
    return cinematics.find((c) => c.id === decodedId);
  }, [id]);

  // Imagens de galeria padrão
  const defaultGalleryImages = [
    {
      id: "1",
      title: "Poster Principal",
      src: cinematic?.cover || "/assets/images/default-poster.jpg",
      description: `Poster oficial de ${cinematic?.title || "Unknown"}`,
      photoCredit: "Studio",
      sourceLink: "#",
      people: cinematic?.cast?.slice(0, 3) || [],
    },
  ];

  const galleryImages = cinematic?.galleryImages || defaultGalleryImages;

  const similarMovies: CinematicItem[] = useMemo(() => {
    if (!cinematic) return [];

    return cinematics
      .filter((c) => c.id !== cinematic.id && c.type === cinematic.type)
      .slice(0, 6)
      .map((c) => ({
        id: c.id,
        title: c.title,
        cover: c.cover,
      }));
  }, [cinematic]);

  const allCinematicsItems: CinematicItem[] = useMemo(() => {
    return cinematics.map((c) => ({
      id: c.id,
      title: c.title,
      cover: c.cover,
    }));
  }, []);

  // Avaliações padrão
  const reviews: Review[] = useMemo(
    () => [
      {
        id: "1",
        author: "Crítico Cinéfilo",
        content: `Uma obra impressionante que demonstra o melhor do ${
          cinematic?.type === "movie"
            ? "cinema"
            : cinematic?.type === "serie"
            ? "seriado"
            : "anime"
        }.`,
        rating: cinematic?.rating || 4,
      },
      {
        id: "2",
        author: "Espectador Assíduo",
        content:
          "Recomendo fortemente para quem aprecia boa narrativa e desenvolvimento de personagens.",
        rating: Math.min((cinematic?.rating || 4) + 1, 5),
      },
    ],
    [cinematic]
  );

  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    if (cinematic) {
      const savedRating = getUserRatingFromStorage(cinematic.id);
      if (savedRating !== null) {
        setUserRating(savedRating);
      }
    }
  }, [cinematic]);

  const handleFavoriteToggle = useCallback(() => {
    setFavorite((prev) => !prev);
  }, []);

  const handleStarClick = useCallback(
    (rating: number) => {
      if (cinematic) {
        setUserRating(rating);
        saveUserRatingToStorage(cinematic.id, rating);
      }
    },
    [cinematic]
  );

  const handleStarHover = useCallback((rating: number | null) => {
    setHoveredRating(rating);
  }, []);

  const MovieCarousel = useMemo(() => {
    if (!cinematic) return null;

    return (
      <div className="flex justify-center mb-12">
        <div className="w-full">
          <Carousel className="rounded-2xl overflow-hidden shadow-2xl">
            <CarouselContent>
              {cinematic.carouselImages.map((img, idx) => (
                <CarouselItem key={`${cinematic.id}-carousel-${idx}`}>
                  <div
                    className="w-full relative overflow-hidden"
                    style={{ height: "350px" }}
                  >
                    {/* Background difuso */}
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover scale-110 blur-xl opacity-30"
                        priority={idx === 0}
                      />
                    </div>

                    {/* Imagem principal */}
                    <Image
                      src={img}
                      alt={`${cinematic.title} scene ${idx + 1}`}
                      fill
                      className="object-contain rounded-lg relative z-10"
                      priority={idx === 0}
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
    );
  }, [cinematic]);

  const InteractiveStarRating = useMemo(() => {
    if (!cinematic) return null;

    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-300 text-sm">Avaliação Geral:</span>
            <div className="text-yellow-400">
              {Array.from({ length: RATING_MAX }).map((_, idx) => (
                <span key={`general-star-${idx}`} className="text-xl">
                  {idx < cinematic.rating ? "★" : "☆"}
                </span>
              ))}
              <span className="text-gray-400 text-sm ml-2">
                {cinematic.rating}/{RATING_MAX}
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
                      localStorage.removeItem(`movie-rating-${cinematic.id}`);
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
    );
  }, [cinematic, userRating, hoveredRating, handleStarClick, handleStarHover]);

  const SimilarMovieCard = ({
    movie: similarMovie,
  }: {
    movie: CinematicItem;
  }) => (
    <Link href={`/details/${encodeURIComponent(similarMovie.id)}`}>
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-lg hover:scale-105 transition-transform cursor-pointer">
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
    </Link>
  );

  const SimilarMoviesSection = useMemo(() => {
    if (similarMovies.length === 0) return null;

    const typeLabel =
      cinematic?.type === "movie"
        ? "Filmes"
        : cinematic?.type === "serie"
        ? "Séries"
        : "Animes";

    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          {typeLabel} Semelhantes
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {similarMovies.map((similarMovie) => (
            <SimilarMovieCard key={similarMovie.id} movie={similarMovie} />
          ))}
        </div>
      </section>
    );
  }, [similarMovies, cinematic]);

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
          <FontAwesomeIcon
            icon={favorite ? faHeart : faHeartRegular}
            className={`w-6 h-6 transition-all duration-300 ${
              favorite
                ? "text-red-500"
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

  // Mostrar estado de não encontrado
  if (!cinematic) {
    return (
      <NotFoundPage
        searchParams={{
          message:
            "O item que você está procurando não existe ou foi removido.",
        }}
      />
    );
  }

  const creatorLabel =
    cinematic.type === "serie" ? "Criado por" : "Dirigido por";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100 px-4 py-8">
      {/* Rolling Covers */}
      <section aria-label="Rolling covers">
        <RollingCovers items={allCinematicsItems} speed={30} />
      </section>

      {/* Carrossel */}
      <section aria-label="Cinematic gallery">{MovieCarousel}</section>

      {/* Cartão de detalhes */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-red-900/40 shadow-2xl ">
          <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6">
            {/* Poster */}
            <div className="flex-shrink-0 flex justify-center md:block">
              <Image
                src={cinematic.cover}
                alt={`${cinematic.title} poster`}
                width={DEFAULT_IMAGE_DIMENSIONS.cover.width}
                height={DEFAULT_IMAGE_DIMENSIONS.cover.height}
                priority
                className="rounded-lg shadow-lg w-48 h-auto sm:w-56 md:w-auto"
              />
            </div>

            {/* Infos */}
            <div className="flex flex-col justify-between flex-1">
              <CardHeader className="p-0 text-center md:text-left mb-4 md:mb-0">
                <CardTitle className="text-2xl sm:text-3xl md:text-2xl text-red-500">
                  {cinematic.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-gray-400">
                  {cinematic.year} • {creatorLabel} {cinematic.creator}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 p-0">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {cinematic.synopsis}
                </p>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                  {/* Avaliações */}
                  <div className="w-full lg:w-auto">
                    {InteractiveStarRating}
                  </div>

                  {/* Elenco Principal */}
                  <div className="w-full lg:w-auto">
                    <span className="font-semibold text-gray-200 block mb-2 text-base sm:text-lg">
                      Elenco Principal:
                    </span>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {cinematic.cast.map((actor, idx) => (
                        <li
                          key={`${cinematic.id}-cast-${idx}`}
                          className="text-sm sm:text-base"
                        >
                          {actor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botão Favoritar */}
                <div className="pt-4 flex justify-center md:justify-start">
                  {FavoriteButton}
                </div>
              </CardContent>
            </div>
          </div>

          {/* CardFooter */}
          <CardFooter className="flex justify-center md:justify-start">
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
        <MovieReviews
          genre={cinematic.genre}
          duration={cinematic.duration}
          reviews={reviews}
        />
      </main>

      {/* Seção de Temporadas */}
      {cinematic.type === "serie" && cinematic.seasons && (
        <SeasonEpisodes
          seasons={cinematic.seasons}
          seriesTitle={cinematic.title}
        />
      )}

      {/* Galeria de Imagens */}
      <ImageGallery images={galleryImages} />

      {/* Similares */}
      {SimilarMoviesSection}
    </div>
  );
}

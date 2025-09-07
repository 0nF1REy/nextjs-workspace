import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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

import ImageGallery from "@/components/description/image-gallery";

const DynamicMovieReviews = dynamic(
  () => import("@/components/description/movie-reviews"),
  {
    loading: () => (
      <div className="p-4 bg-gray-800 rounded-xl h-64 animate-pulse"></div>
    ),
  }
);

const DynamicUserInteractiveElements = dynamic(
  () =>
    import("@/components/description/user-interactive-elements").then(
      (mod) => ({ default: mod.UserInteractiveElements })
    ),
  {
    loading: () => (
      <div className="space-y-4 p-4 bg-gray-800 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-8 w-32 bg-gray-700 rounded-md"></div>
      </div>
    ),
  }
);

import SeasonEpisodes from "@/components/description/season-episodes";

import { cinematics } from "@/lib/details";

import NotFoundPage from "@/app/not-found";
import { CinematicDetail, Review } from "@/lib/details/types";
import { CinematicItem } from "@/lib/items/types";

import "@/styles/rolling-covers.css";

// Rolling Covers
interface RollingCoversProps {
  items: CinematicItem[];
  speed?: number;
}

const RollingCovers = ({ items, speed = 1 }: RollingCoversProps) => {
  if (!items || items.length === 0) return null;

  const duplicatedItems = [...items, ...items, ...items];
  const totalWidth = items.length * 170;
  const animationDuration = totalWidth / speed;

  return (
    <div className="w-full overflow-hidden py-6 bg-gradient-to-r from-transparent via-red-900/10 to-transparent">
      <div
        className="flex gap-4 rolling-scroll"
        style={
          {
            "--scroll-distance": `-${totalWidth}px`,
            "--duration": `${animationDuration}s`,
            width: `${duplicatedItems.length * 170}px`,
          } as React.CSSProperties
        }
      >
        {duplicatedItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={`/details/${encodeURIComponent(item.id)}`}
          >
            <div className="flex-shrink-0 w-40 h-10 relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <Image
                src={item.cover}
                alt={item.title}
                fill
                className="object-cover"
                sizes="160px"
              />
              {/* Overlay escuro */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10">
                <p className="text-white text-xs font-medium truncate">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const DEFAULT_IMAGE_DIMENSIONS = {
  cover: { width: 230, height: 345 },
  similar: { width: 160, height: 240 },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Sub-componente para o carrossel
const MovieCarouselComponent = ({
  cinematic,
}: {
  cinematic: CinematicDetail;
}) => {
  if (
    !cinematic ||
    !cinematic.carouselImages ||
    cinematic.carouselImages.length === 0
  )
    return null;

  return (
    <div className="flex justify-center mb-12">
      <div className="w-full">
        <Carousel className="rounded-2xl overflow-hidden shadow-2xl">
          <CarouselContent>
            {cinematic.carouselImages.map((img, idx) => (
              <CarouselItem key={`${cinematic.id}-carousel-${idx}`}>
                <div className="w-full relative overflow-hidden h-[220px] sm:h-[350px]">
                  {/* Background difuso */}
                  <div className="absolute inset-0 -z-10 hidden sm:block">
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
                    className="rounded-lg relative z-10 object-cover sm:object-contain"
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
};

// Sub-componente para cards de filmes semelhantes
const SimilarMovieCard = ({
  movie: similarMovie,
}: {
  movie: CinematicItem;
}) => (
  <Link href={`/details/${encodeURIComponent(similarMovie.id)}`}>
    <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-lg hover:scale-105 transition-transform cursor-pointer rounded-lg overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={similarMovie.cover}
          alt={similarMovie.title}
          width={DEFAULT_IMAGE_DIMENSIONS.similar.width}
          height={DEFAULT_IMAGE_DIMENSIONS.similar.height}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-3">
        <div className="w-full text-center">
          <p className="text-xs font-medium text-gray-200 truncate">
            {similarMovie.title}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

// Sub-componente para a seção de filmes semelhantes
const SimilarMoviesSectionComponent = ({
  cinematic,
  similarMovies,
}: {
  cinematic: CinematicDetail;
  similarMovies: CinematicItem[];
}) => {
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
};

// É um Server Component
export default async function CinematicDescriptionPage({ params }: PageProps) {
  const { id } = await params;

  const decodedId = decodeURIComponent(id);
  const cinematic = cinematics.find((c) => c.id === decodedId);

  if (!cinematic) {
    return (
      <NotFoundPage message="O item que você está procurando não existe ou foi removido." />
    );
  }

  const galleryImages = cinematic?.galleryImages;

  const similarMovies: CinematicItem[] = cinematics
    .filter((c) => c.id !== cinematic.id && c.type === cinematic.type)
    .slice(0, 6)
    .map((c) => ({
      id: c.id,
      title: c.title,
      poster: c.cover,
      cover: c.cover,
    }));

  const allCinematicsItems: CinematicItem[] = cinematics.map((c) => ({
    id: c.id,
    title: c.title,
    poster: c.cover,
    cover: c.cover,
  }));

  // Avaliações padrão
  const reviews: Review[] = [
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
  ];

  const creatorLabel =
    cinematic.type === "serie" ? "Criado por" : "Dirigido por";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100 px-4 py-8">
      {/* Rolling Covers */}
      <section aria-label="Rolling covers">
        <RollingCovers items={allCinematicsItems} speed={20} />
      </section>

      {/* Carrossel */}
      <section aria-label="Cinematic gallery">
        <MovieCarouselComponent cinematic={cinematic} />
      </section>

      {/* Cartão de detalhes*/}
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
                  {/* Avaliações do Usuário e Favoritar */}
                  <div className="w-full lg:w-auto">
                    <Suspense
                      fallback={
                        <div className="space-y-4 p-4 bg-gray-800 rounded-lg animate-pulse">
                          <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
                          <div className="flex gap-2">
                            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                          </div>
                          <div className="h-8 w-32 bg-gray-700 rounded-md"></div>
                        </div>
                      }
                    >
                      <DynamicUserInteractiveElements
                        cinematicId={cinematic.id}
                        cinematicRating={cinematic.rating}
                        cinematicTitle={cinematic.title}
                        cinematicCover={cinematic.cover}
                        cinematicType={cinematic.type}
                      />
                    </Suspense>
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

        {/* Resenhas - DINÂMICAS, carregadas via Suspense */}
        <Suspense
          fallback={
            <div className="p-4 bg-gray-800 rounded-xl h-64 animate-pulse"></div>
          }
        >
          <DynamicMovieReviews
            genre={cinematic.genre}
            duration={cinematic.duration}
            reviews={reviews}
            cinematicId={cinematic.id}
          />
        </Suspense>
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
      <SimilarMoviesSectionComponent
        cinematic={cinematic}
        similarMovies={similarMovies}
      />
    </div>
  );
}

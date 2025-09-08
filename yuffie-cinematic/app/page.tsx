"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { items, Item } from "@/lib/items";
import { cinematics, CinematicDetail } from "@/lib/details";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const destaquesRef = useRef<HTMLDivElement>(null);

  const movieRef = useRef<HTMLDivElement>(null);
  const serieRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<HTMLDivElement>(null);

  const carouselRefs = useMemo(
    () => ({
      movie: movieRef,
      serie: serieRef,
      anime: animeRef,
    }),
    []
  );

  const [scrollStates, setScrollStates] = useState({
    movie: { canScrollLeft: false, canScrollRight: false },
    serie: { canScrollLeft: false, canScrollRight: false },
    anime: { canScrollLeft: false, canScrollRight: false },
  });

  const videoItems = useMemo(() => items.filter((i) => i.video), []);
  const [currentVideoItem, setCurrentVideoItem] = useState<Item | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playedVideos, setPlayedVideos] = useState<string[]>([]);

  const categories = useMemo(
    () => [
      { key: "movie" as const, label: "Filmes" },
      { key: "serie" as const, label: "Séries" },
      { key: "anime" as const, label: "Animes" },
    ],
    []
  );

  const highlightIds = useMemo(
    () => ["a-time-to-kill", "the-x-files", "the-godfather", "parasite"],
    []
  );

  const highlights = useMemo(
    () =>
      highlightIds
        .map((id) => items.find((item) => item.id === id))
        .filter(Boolean) as Item[],
    [highlightIds]
  );

  useEffect(() => {
    if (videoItems.length > 0) {
      setCurrentVideoItem(
        videoItems[Math.floor(Math.random() * videoItems.length)]
      );
    }
  }, [videoItems]);

  const getNextRandomVideo = useCallback(() => {
    if (videoItems.length <= 1) return null;

    let availableVideos = videoItems.filter(
      (item) => item.id !== currentVideoItem?.id
    );

    // Se todos os vídeos já foram reproduzidos, reseta a lista (exceto o atual)
    if (playedVideos.length >= videoItems.length - 1) {
      setPlayedVideos([]);
      availableVideos = videoItems.filter(
        (item) => item.id !== currentVideoItem?.id
      );
    } else {
      // Filtra vídeos que ainda não foram reproduzidos
      availableVideos = availableVideos.filter(
        (item) => !playedVideos.includes(item.id)
      );
    }

    if (availableVideos.length === 0) return null;

    return availableVideos[Math.floor(Math.random() * availableVideos.length)];
  }, [videoItems, currentVideoItem, playedVideos]);

  const handleVideoEnd = useCallback(() => {
    if (!currentVideoItem) return;

    // Adiciona o vídeo atual à lista de reproduzidos
    setPlayedVideos((prev) => [...prev, currentVideoItem.id]);

    // Seleciona o próximo vídeo
    const nextVideo = getNextRandomVideo();
    if (nextVideo) {
      setVideoLoaded(false);
      setCurrentVideoItem(nextVideo);
    }
  }, [currentVideoItem, getNextRandomVideo]);

  const getCinematicDetails = useCallback(
    (id: string) => cinematics.find((d: CinematicDetail) => d.id === id),
    []
  );

  const getVideoDetailId = useCallback(
    () =>
      currentVideoItem &&
      (getCinematicDetails(currentVideoItem.id)?.id || currentVideoItem.id),
    [currentVideoItem, getCinematicDetails]
  );

  const scrollToRef = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const checkScrollState = useCallback(
    (key: keyof typeof carouselRefs) => {
      const el = carouselRefs[key].current;
      if (!el) return;

      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight =
        el.scrollLeft < el.scrollWidth - el.clientWidth - 1;

      setScrollStates((prev) => ({
        ...prev,
        [key]: { canScrollLeft, canScrollRight },
      }));
    },
    [carouselRefs]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      categories.forEach((cat) => {
        checkScrollState(cat.key);
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [categories, checkScrollState]);

  useEffect(() => {
    const refs = Object.entries(carouselRefs);

    const cleanupFunctions: (() => void)[] = [];

    refs.forEach(([key, ref]) => {
      const element = ref.current;
      if (!element) return;

      const handleScroll = () => {
        checkScrollState(key as keyof typeof carouselRefs);
      };

      const handleResize = () => {
        setTimeout(() => {
          checkScrollState(key as keyof typeof carouselRefs);
        }, 100);
      };

      element.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      cleanupFunctions.push(() => {
        element.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [carouselRefs, checkScrollState]);

  const scrollCarousel = useCallback(
    (key: keyof typeof carouselRefs, direction: "left" | "right") => {
      const el = carouselRefs[key].current;
      if (!el) return;

      const amount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth",
      });

      setTimeout(() => {
        checkScrollState(key);
      }, 300);
    },
    [carouselRefs, checkScrollState]
  );

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100">
      {/* Vídeo em Destaque */}
      <section className="relative w-full h-screen flex items-end justify-center overflow-hidden">
        {currentVideoItem?.video ? (
          <video
            key={currentVideoItem.id}
            src={currentVideoItem.video}
            autoPlay
            muted
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
            onEnded={handleVideoEnd}
            onClick={() => {
              if (videoLoaded && currentVideoItem) {
                router.push(
                  `/details/${encodeURIComponent(getVideoDetailId()!)}`
                );
              }
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded
                ? "cursor-pointer opacity-100"
                : "cursor-wait opacity-75"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-gray-400 italic">
              Nenhum vídeo disponível
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        <motion.div
          className="relative text-center pb-16 px-4 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 drop-shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            Descubra o melhor do cinema
          </motion.p>
          <motion.div
            className="mt-8 cursor-pointer text-red-500 hover:text-red-400 transition-colors drop-shadow-lg"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            onClick={() => scrollToRef(destaquesRef)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faChevronDown} size="3x" />
            <p className="text-sm mt-2 font-medium">Explorar</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Grid Destaques */}
      <section ref={destaquesRef} className="px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8">
          Destaques
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={`highlight-${item.id}-${idx}`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div
                className={`overflow-hidden border border-red-900/40 hover:border-red-600 transition rounded-lg shadow-lg ${
                  item.id === "a-time-to-kill" || item.id === "the-x-files"
                    ? 'bg-gradient-to-br from-gray-900 to-black bg-[url("/assets/animations/space-particles.gif")] bg-cover bg-center bg-no-repeat'
                    : "bg-gradient-to-br from-gray-900 to-black"
                }`}
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={idx < 6}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-100 line-clamp-1">
                    {item.title}
                  </h3>
                  <Link
                    href={`/details/${encodeURIComponent(
                      getCinematicDetails(item.id)?.id || item.id
                    )}`}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-3 w-full bg-red-700 hover:bg-red-600 text-white shadow-md"
                    >
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Carrosséis por Categoria */}
      {categories.map((cat) => {
        const filteredItems = items.filter((i) => i.type === cat.key);
        const scrollState = scrollStates[cat.key];

        return (
          <section key={cat.key} className="px-6 md:px-12 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">
              {cat.label}
            </h2>
            <div className="relative py-2">
              {/* Seta esquerda */}
              {scrollState.canScrollLeft && (
                <button
                  onClick={() => scrollCarousel(cat.key, "left")}
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
                  aria-label="Scroll left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </button>
              )}

              {/* Seta direita */}
              {scrollState.canScrollRight && (
                <button
                  onClick={() => scrollCarousel(cat.key, "right")}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
                  aria-label="Scroll right"
                >
                  <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </button>
              )}

              <motion.div
                ref={carouselRefs[cat.key]}
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
                style={{
                  overflowY: "visible",
                  paddingTop: "8px",
                  paddingBottom: "16px",
                }}
              >
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={`${cat.key}-${item.id}-${idx}`}
                    className="min-w-[200px] flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      href={`/details/${encodeURIComponent(
                        getCinematicDetails(item.id)?.id || item.id
                      )}`}
                    >
                      <div className="overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-red-900/40 hover:border-red-600 transition relative rounded-lg shadow-lg">
                        <div className="relative h-60 overflow-hidden">
                          <Image
                            src={item.poster}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority={idx < 3}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-100 line-clamp-1">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

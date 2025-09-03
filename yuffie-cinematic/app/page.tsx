"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  const carouselRefs = {
    movie: useRef<HTMLDivElement>(null),
    serie: useRef<HTMLDivElement>(null),
    anime: useRef<HTMLDivElement>(null),
  };

  const videoItems = useMemo(() => items.filter((i) => i.video), []);
  const [currentVideoItem, setCurrentVideoItem] = useState<Item | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoItems.length > 0) {
      setCurrentVideoItem(
        videoItems[Math.floor(Math.random() * videoItems.length)]
      );
    }
  }, [videoItems]);

  const categories = [
    { key: "movie" as const, label: "Filmes" },
    { key: "serie" as const, label: "Séries" },
    { key: "anime" as const, label: "Animes" },
  ];

  const detailIds = ["a-time-to-kill", "the-x-files"];
  const highlightIds = [
    "a-time-to-kill",
    "the-x-files",
    "the-godfather",
    "parasite",
  ];

  const highlights = highlightIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean) as Item[];

  const getCinematicDetails = (id: string) =>
    cinematics.find((d: CinematicDetail) => d.id === id);

  const getVideoDetailId = () =>
    currentVideoItem &&
    (getCinematicDetails(currentVideoItem.id)?.id || currentVideoItem.id);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollCarousel = (
    key: keyof typeof carouselRefs,
    direction: "left" | "right"
  ) => {
    const el = carouselRefs[key].current;
    if (!el) return;
    const amount = el.clientWidth || 300;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[#0d0d0d] text-gray-200 min-h-screen">
      {/* Vídeo em Destaque */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-end justify-center overflow-hidden">
        {currentVideoItem?.video ? (
          <video
            src={currentVideoItem.video}
            autoPlay
            muted
            loop
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
            onClick={() => {
              if (videoLoaded && currentVideoItem) {
                router.push(
                  `/details/${encodeURIComponent(getVideoDetailId()!)}`
                );
              }
            }}
            className={`absolute inset-0 w-full h-full object-cover sm:object-contain md:object-cover ${
              videoLoaded ? "cursor-pointer" : "cursor-wait"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-gray-400 italic">
              Nenhum vídeo disponível
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        <motion.div
          className="relative text-center pb-10 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300">
            Descubra o melhor do cinema
          </p>
          <motion.div
            className="mt-6 cursor-pointer text-gray-200 hover:text-red-500 transition-colors"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={() => scrollToRef(destaquesRef)}
          >
            <FontAwesomeIcon icon={faChevronDown} size="2x" />
          </motion.div>
        </motion.div>
      </section>

      {/* Grid Destaques */}
      <section ref={destaquesRef} className="px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
          Destaques
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={`highlight-${item.id}-${idx}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="overflow-hidden bg-[#1a1a1a] border border-gray-800 hover:border-red-600 transition">
                <CardHeader className="relative h-60">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={idx < 6}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base font-semibold text-gray-100 line-clamp-1">
                    {item.title}
                  </CardTitle>
                  {detailIds.includes(item.id) && (
                    <Link
                      href={`/details/${encodeURIComponent(
                        getCinematicDetails(item.id)?.id || item.id
                      )}`}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        Ver detalhes
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Carrosséis por Categoria */}
      {categories.map((cat) => {
        const filteredItems = items.filter((i) => i.type === cat.key);
        return (
          <section key={cat.key} className="px-6 md:px-12 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              {cat.label}
            </h2>
            <div className="relative">
              <button
                onClick={() => scrollCarousel(cat.key, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <button
                onClick={() => scrollCarousel(cat.key, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>

              <motion.div
                ref={carouselRefs[cat.key]}
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
              >
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={`${cat.key}-${item.id}-${idx}`}
                    className="min-w-[200px] flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Card className="overflow-hidden bg-[#1a1a1a] border border-gray-800 hover:border-red-600 transition relative">
                      <CardHeader className="relative h-60">
                        <Image
                          src={item.poster}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={idx < 3}
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-base font-semibold text-gray-100 line-clamp-1">
                          {item.title}
                        </CardTitle>
                      </CardContent>
                    </Card>
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

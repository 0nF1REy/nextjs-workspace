"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

type Item = {
  title: string;
  poster: string;
  video?: string | null;
  detail?: string;
  category?: "filme" | "serie" | "anime";
};

export default function HomePage() {
  const filmeCarouselRef = useRef<HTMLDivElement>(null);
  const serieCarouselRef = useRef<HTMLDivElement>(null);
  const animeCarouselRef = useRef<HTMLDivElement>(null);

  const items: Item[] = [
    {
      title: "Tempo de Matar",
      poster: "/assets/images/a-time-to-kill-1996.jpg",
      detail: "/movie-description",
      category: "filme",
    },
    {
      title: "Arquivo X",
      poster: "/assets/images/the-x-files-1993.jpg",
      detail: "/serie-description",
      category: "serie",
    },
    {
      title: "O Poderoso Chefão",
      poster: "/assets/images/the-godfather-1972.jpg",
      category: "filme",
    },
    {
      title: "Anjos Caídos",
      poster: "/assets/images/fallen-angels-1995.jpg",
      category: "anime",
    },
    {
      title: "Amadeus",
      poster: "/assets/images/amadeus-1984.jpg",
      category: "filme",
    },
    {
      title: "John Wick: Capítulo 2",
      poster: "/assets/images/john-wick-chapter-2-2017.jpg",
      category: "filme",
    },
    {
      title: "Ip Man",
      poster: "/assets/images/ip-man-2008.jpg",
      category: "filme",
    },
    {
      title: "Um Sonho de Liberdade",
      poster: "/assets/images/the-shawshank-redemption-1994.jpg",
      category: "filme",
    },
    {
      title: "Efeito Borboleta",
      poster: "/assets/images/the-butterfly-effect-2004.jpg",
      category: "serie",
    },
    {
      title: "O Jogo da Imitação",
      poster: "/assets/images/the-imitation-game-2014.jpg",
      category: "serie",
    },
    {
      title: "Parasita",
      poster: "/assets/images/parasite-2019.jpg",
      category: "serie",
    },
    {
      title: "De Volta para o Futuro",
      poster: "/assets/images/back-to-the-future-1985.jpg",
      category: "anime",
    },
    {
      title: "Um Tira da Pesada",
      poster: "/assets/images/beverly-hills-cop-1984.jpg",
      category: "anime",
    },
    {
      title: "Fuga de Nova York",
      poster: "/assets/images/escape-from-new-york-1981.jpg",
      category: "anime",
    },
  ];

  const videoItems = items.filter((item) => item.video);
  const videoSrc =
    videoItems.length > 0
      ? videoItems[Math.floor(Math.random() * videoItems.length)].video
      : null;

  const categories: {
    key: Item["category"];
    label: string;
    ref: React.RefObject<HTMLDivElement | null>;
  }[] = [
    { key: "filme", label: "Filmes", ref: filmeCarouselRef },
    { key: "serie", label: "Séries", ref: serieCarouselRef },
    { key: "anime", label: "Animes", ref: animeCarouselRef },
  ];

  return (
    <main className="bg-[#0d0d0d] text-gray-200 min-h-screen">
      {/* Seção de Vídeo em Destaque */}
      <section className="relative w-full h-[90vh] flex items-end justify-center">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-gray-400 italic">
              Nenhum vídeo disponível
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <motion.div
          className="relative text-center pb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-xl md:text-2xl font-light text-gray-300">
            Descubra o melhor do cinema
          </p>
          <motion.div
            className="mt-6 cursor-pointer text-gray-200"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FontAwesomeIcon icon={faChevronDown} size="2x" />
          </motion.div>
        </motion.div>
      </section>

      {/* Grid Destaques */}
      <section className="px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
          Destaques
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {items.slice(0, 4).map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
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
                  {item.detail && (
                    <Link href={item.detail}>
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
        const filteredItems = items.filter((i) => i.category === cat.key);

        const scrollLeft = () => {
          if (cat.ref.current)
            cat.ref.current.scrollBy({ left: -300, behavior: "smooth" });
        };
        const scrollRight = () => {
          if (cat.ref.current)
            cat.ref.current.scrollBy({ left: 300, behavior: "smooth" });
        };

        return (
          <section key={cat.key} className="px-6 md:px-12 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              {cat.label}
            </h2>
            <div className="relative">
              {/* Setas */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>

              {/* Carrossel */}
              <motion.div
                ref={cat.ref}
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
              >
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={`${item.title}-${idx}`}
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
                        {item.detail && (
                          <Link href={item.detail}>
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
              </motion.div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

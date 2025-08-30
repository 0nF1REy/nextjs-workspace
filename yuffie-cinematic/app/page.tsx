"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const items = [
    {
      title: "Tempo de Matar",
      poster: "/assets/images/a-time-to-kill-1996.jpg",
      video: null,
      detail: "/movie-description",
    },
    {
      title: "Arquivo X",
      poster: "/assets/images/the-x-files-1993.jpg",
      video: null,
      detail: "/serie-description",
    },
    {
      title: "Amadeus",
      poster: "/assets/images/amadeus-1984.jpg",
      video: null,
    },
    {
      title: "John Wick: Capítulo 2",
      poster: "/assets/images/john-wick-chapter-2-2017.jpg",
      video: null,
    },
    { title: "Ip Man", poster: "/assets/images/ip-man-2008.jpg", video: null },
    {
      title: "O Poderoso Chefão",
      poster: "/assets/images/the-godfather-1972.jpg",
      video: null,
    },
    {
      title: "Um Sonho de Liberdade",
      poster: "/assets/images/the-shawshank-redemption-1994.jpg",
      video: null,
    },
    {
      title: "Efeito Borboleta",
      poster: "/assets/images/the-butterfly-effect-2004.jpg",
      video: null,
    },
    {
      title: "O Jogo da Imitação",
      poster: "/assets/images/the-imitation-game-2014.jpg",
      video: null,
    },
    {
      title: "Parasita",
      poster: "/assets/images/parasite-2019.jpg",
      video: null,
    },
    {
      title: "Anjos Caídos",
      poster: "/assets/images/fallen-angels-1995.jpg",
      video: null,
    },
    {
      title: "De Volta para o Futuro",
      poster: "/assets/images/back-to-the-future-1985.jpg",
      video: null,
    },
    {
      title: "Um Tira da Pesada",
      poster: "/assets/images/beverly-hills-cop-1984.jpg",
      video: null,
    },
    {
      title: "Fuga de Nova York",
      poster: "/assets/images/escape-from-new-york-1981.jpg",
      video: null,
    },
    {
      title: "Road House",
      poster: "/assets/images/road-house-1989.jpg",
      video: null,
    },
    {
      title: "Eles Vivem",
      poster: "/assets/images/they-live-1988.jpg",
      video: null,
    },
  ];

  const videoItems = items.filter((item) => item.video);

  function getRandomVideo() {
    if (videoItems.length === 0) return null;
    const idx = Math.floor(Math.random() * videoItems.length);
    return videoItems[idx].video;
  }

  const videoSrc = getRandomVideo();

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
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        {/* Call-to-action */}
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
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Seção de Filmes e Séries */}
      <section className="px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8">
          Filmes & Séries
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {items.map((item, idx) => (
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
                    priority={idx < 4}
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
    </main>
  );
}

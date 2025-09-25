"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Item } from "@/lib/items";
import { useEffect, useState, useCallback, RefObject } from "react";
import { useRouter } from "next/navigation";

interface HeroVideoProps {
  videoItems: Item[];
  getCinematicDetails: (id: string) => { id: string } | undefined;
  scrollToRef: (ref: RefObject<HTMLDivElement | null>) => void;
  destaquesRef: RefObject<HTMLDivElement | null>;
}

export function HeroVideo({
  videoItems,
  getCinematicDetails,
  scrollToRef,
  destaquesRef,
}: HeroVideoProps) {
  const router = useRouter();
  const [currentVideoItem, setCurrentVideoItem] = useState<Item | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playedVideos, setPlayedVideos] = useState<string[]>([]);

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

    if (playedVideos.length >= videoItems.length - 1) {
      setPlayedVideos([]);
      availableVideos = videoItems.filter(
        (item) => item.id !== currentVideoItem?.id
      );
    } else {
      availableVideos = availableVideos.filter(
        (item) => !playedVideos.includes(item.id)
      );
    }

    if (availableVideos.length === 0) return null;

    return availableVideos[Math.floor(Math.random() * availableVideos.length)];
  }, [videoItems, currentVideoItem, playedVideos]);

  const handleVideoEnd = useCallback(() => {
    if (!currentVideoItem) return;

    setPlayedVideos((prev) => [...prev, currentVideoItem.id]);

    const nextVideo = getNextRandomVideo();
    if (nextVideo) {
      setVideoLoaded(false);
      setCurrentVideoItem(nextVideo);
    }
  }, [currentVideoItem, getNextRandomVideo]);

  const getVideoDetailId = useCallback(
    () =>
      currentVideoItem &&
      (getCinematicDetails(currentVideoItem.id)?.id || currentVideoItem.id),
    [currentVideoItem, getCinematicDetails]
  );

  return (
    <section className="relative w-full h-screen flex items-end justify-center overflow-hidden">
      {/* Vídeo */}
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
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
            ${
              videoLoaded
                ? "opacity-100 blur-0 cursor-pointer"
                : "opacity-50 blur-sm cursor-wait"
            }`}
          style={{ willChange: "opacity, transform, filter" }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <span className="text-gray-400 italic text-lg">
            Nenhum vídeo disponível
          </span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),transparent_40%)] pointer-events-none" />

      {/* Conteúdo Hero */}
      <motion.div
        className="relative text-center pb-20 px-6 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Título Hero Desktop */}
        <motion.h1
          className="hidden md:block font-NeomatrixCode text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_2px_25px_rgba(0,0,0,0.7)] mb-6 tracking-wide leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          Sua plataforma cinematográfica completa
        </motion.h1>

        {/* Subtítulo Desktop */}
        <motion.p
          className="hidden md:block text-lg sm:text-xl text-gray-200 drop-shadow-lg mb-12 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Explore filmes, séries e animes com avaliações, resenhas e informações
          detalhadas de cada produção.
        </motion.p>

        {/* Subtítulo Mobile */}
        <motion.p
          className="block md:hidden font-NeomatrixCode text-lg sm:text-xl text-gray-200 drop-shadow-lg mb-12 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Comece sua jornada cinematográfica
        </motion.p>

        {/* Botão Explorar */}
        <motion.div
          className="cursor-pointer text-red-500 hover:text-red-400 drop-shadow-[0_0_18px_rgba(255,0,0,0.7)] flex flex-col items-center"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          onClick={() => scrollToRef(destaquesRef)}
          whileHover={{ scale: 1.25, rotate: 0 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faChevronDown} size="3x" />
          <span className="text-sm mt-2 font-medium text-white drop-shadow-md">
            Explorar
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

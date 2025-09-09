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
          <span className="text-gray-400 italic">Nenhum vídeo disponível</span>
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
  );
}

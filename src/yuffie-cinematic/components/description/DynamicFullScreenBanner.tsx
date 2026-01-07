"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DynamicFullScreenBannerProps {
  image: string;
  alt: string;
  layoutId: string;
}

export function DynamicFullScreenBanner({
  image,
  alt,
  layoutId,
}: DynamicFullScreenBannerProps) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="w-full h-full"
      style={{ position: "relative" }}
    >
      <div className="w-full h-full relative overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-sm transition-all duration-700"
          priority
        />
        {/* Overlay + fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent"
        />
        {/* Glow/Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-white/10 blur-2xl pointer-events-none"
        />
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="absolute bottom-12 left-0 right-0 text-center z-20"
        >
          <span className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg tracking-wide animate-pulse">
            {alt}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

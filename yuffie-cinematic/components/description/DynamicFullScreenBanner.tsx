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
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="w-full h-full"
    >
      <div className="w-full relative overflow-hidden h-full rounded-2xl shadow-2xl">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </motion.div>
  );
}

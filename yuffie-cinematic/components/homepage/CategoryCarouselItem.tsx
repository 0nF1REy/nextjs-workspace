"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Item } from "@/lib/items";

interface CategoryCarouselItemProps {
  item: Item;
  categoryKey: string;
  getCinematicDetails: (id: string) => { id: string } | undefined;
  priority: boolean;
  idx: number;
}

export function CategoryCarouselItem({
  item,
  categoryKey,
  getCinematicDetails,
  priority,
  idx,
}: CategoryCarouselItemProps) {
  return (
    <motion.div
      key={`${categoryKey}-${item.id}-${idx}`}
      className="min-w-[200px] flex-shrink-0 p-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link
        href={`/details/${encodeURIComponent(
          getCinematicDetails(item.id)?.id || item.id
        )}`}
      >
        <div
          className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-red-900/40 
                    hover:border-red-600 transition-all duration-500 rounded-lg shadow-md hover:shadow-lg cursor-pointer
                    hover:brightness-110 transform"
        >
          {/* Imagem */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={item.poster}
              alt={item.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0.5"
              priority={priority}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-red-500/0 via-purple-500/10 to-blue-500/0 
                        opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            />
          </div>

          {/* Título */}
          <div className="p-4">
            <h3
              className="text-base font-semibold text-gray-100 line-clamp-1 
                       transition-all duration-500 group-hover:text-cyan-300 group-hover:scale-105"
            >
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

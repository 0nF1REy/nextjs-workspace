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
              priority={priority}
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
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Item } from "@/lib/items";

interface CategoryCarouselItemProps {
  item: Item;
  getCinematicDetails: (id: string) => { id: string } | undefined;
  priority: boolean;
}

export function CategoryCarouselItem({
  item,
  getCinematicDetails,
  priority,
}: CategoryCarouselItemProps) {
  return (
    <div className="min-w-[200px] flex-shrink-0 p-2">
      <Link
        href={`/details/${encodeURIComponent(
          getCinematicDetails(item.id)?.id || item.id
        )}`}
      >
        <div
          className="group relative bg-[#0d1118] border border-red-900/40 text-gray-200 
                   rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform cursor-pointer
                   hover:scale-105 hover:border-red-500/50 hover:brightness-110 
                   hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)]"
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3 pointer-events-none 
                       transition-opacity duration-500 ease-out group-hover:from-red-500/8 group-hover:to-purple-500/8"
          ></div>

          {/* Imagem */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={item.poster}
              alt={item.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 
                       group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
              priority={priority}
            />
          </div>

          {/* Título */}
          <div className="relative z-10 p-4">
            <h3
              className="text-base font-semibold text-gray-200 line-clamp-1 
                       transition-all duration-500 group-hover:text-red-300 group-hover:scale-105"
            >
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

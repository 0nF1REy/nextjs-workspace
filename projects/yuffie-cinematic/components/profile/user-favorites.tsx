"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavoritesStore } from "@/stores";
import { cinematics } from "@/lib/details";

export default function UserFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <FontAwesomeIcon
          icon={faHeart}
          className="w-16 h-16 text-gray-600 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          Nenhum favorito ainda
        </h3>
        <p className="text-gray-500">
          Adicione filmes, séries e animes aos seus favoritos!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favorites.map((favorite) => {
        const fullItem = cinematics.find((item) => item.id === favorite.id);

        return (
          <div
            key={favorite.id}
            className="group relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <Link href={`/details/${favorite.id}`}>
              <div className="relative aspect-[3/4]">
                <Image
                  src={favorite.cover}
                  alt={favorite.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {favorite.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-xs capitalize">
                        {favorite.type === "movie"
                          ? "Filme"
                          : favorite.type === "serie"
                          ? "Série"
                          : "Anime"}
                      </span>
                      {fullItem && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-gray-300 text-xs">
                            {fullItem.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="w-4 h-4 text-red-500"
                  />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

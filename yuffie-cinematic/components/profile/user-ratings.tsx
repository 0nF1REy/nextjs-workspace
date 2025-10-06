"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import { useRatingsStore, useFavoritesStore } from "@/stores";
import { items } from "@/lib/items";
import { Item as CinematicItem } from "@/lib/items/types";
import { UserRating } from "@/lib/user/types";

interface RatedCinematicItem extends CinematicItem {
  userRating?: number;
}

const RatedItemCard = ({ item }: { item: RatedCinematicItem }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { isFavorite } = useFavoritesStore();

  useEffect(() => {
    // Verificar se o item está nos favoritos usando Zustand
    setIsFavorited(isFavorite(item.id));
  }, [item.id, isFavorite]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
    >
      <Link href={`/details/${item.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={item.poster}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />

          {/* Overlay com informações */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-xs capitalize">
                  {item.type === "movie"
                    ? "Filme"
                    : item.type === "serie"
                    ? "Série"
                    : "Anime"}
                </span>
                {/* Mostrar coração apenas se estiver favoritado */}
                {isFavorited && (
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="w-3 h-3 text-red-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating badge no topo direito */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faStarSolid}
                className="w-3 h-3 text-yellow-400"
              />
              <span className="text-white text-xs font-semibold">
                {item.userRating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const StarFilter = ({
  selectedRating,
  onSelectRating,
}: {
  selectedRating: number | null;
  onSelectRating: (rating: number | null) => void;
}) => {
  const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-8">
      <p className="text-sm font-semibold text-gray-300 mr-2">
        Filtrar por nota:
      </p>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {ratings.map((rate) => (
          <button
            key={rate}
            onClick={() =>
              onSelectRating(selectedRating === rate ? null : rate)
            }
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
              selectedRating === rate
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <FontAwesomeIcon
              icon={faStarSolid}
              className="w-4 h-4 text-yellow-400"
            />
            <span className="font-semibold text-sm">{rate.toFixed(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function UserRatings() {
  const [ratedItems, setRatedItems] = useState<RatedCinematicItem[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { getAllRatings } = useRatingsStore();

  useEffect(() => {
    const userRatings = getAllRatings();
    const allItems = items;

    const getRatedItems = () => {
      const ratedMap = new Map<string, UserRating>(
        userRatings.map((r: UserRating) => [r.movieId, r])
      );

      const detailedRatedItems: RatedCinematicItem[] = allItems
        .filter((item) => ratedMap.has(item.id))
        .map((item) => ({
          ...item,
          userRating: ratedMap.get(item.id)?.rating,
        }));

      setRatedItems(detailedRatedItems);
    };

    getRatedItems();
  }, [getAllRatings]);

  const filteredItems = selectedRating
    ? ratedItems.filter((item) => item.userRating === selectedRating)
    : ratedItems;

  if (ratedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          Você ainda não avaliou nenhum filme, série ou anime.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Suas avaliações aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div>
      <StarFilter
        selectedRating={selectedRating}
        onSelectRating={setSelectedRating}
      />

      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredItems.map((item) => (
            <RatedItemCard key={item.id} item={item} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">
            Nenhum item encontrado com a nota{" "}
            <span className="font-bold text-red-500">
              {selectedRating?.toFixed(1)}
            </span>
            .
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tente selecionar outra nota ou limpar o filtro.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import { getUserRatings } from "@/lib/user/storage";
import { items } from "@/lib/items";
import { Card, CardContent } from "@/components/ui/card";
import { Item as CinematicItem } from "@/lib/items/types";
import { UserRating } from "@/lib/user/types";

interface RatedCinematicItem extends CinematicItem {
  userRating?: number;
}

// Componente para exibir um único item cinematográfico
const RatedItemCard = ({ item }: { item: CinematicItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative group"
  >
    <Link href={`/details/${item.id}`}>
      <Card className="overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
        <CardContent className="p-0">
          <Image
            src={item.poster}
            alt={item.title}
            width={200}
            height={300}
            className="w-full h-auto object-cover"
          />
        </CardContent>
      </Card>
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-center text-sm font-bold p-2">
          {item.title}
        </p>
      </div>
    </Link>
  </motion.div>
);

// Componente para a seleção de estrelas
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

// Componente principal
export default function UserRatings() {
  const [ratedItems, setRatedItems] = useState<RatedCinematicItem[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    const userRatings = getUserRatings();
    const allItems = items;

    const getRatedItems = () => {
      const ratedMap = new Map<string, UserRating>(
        userRatings.map((r) => [r.movieId, r])
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
  }, []);

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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4"
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

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import { useFavoritesStore, useRatingsStore } from "@/stores";

interface UserStatsProps {
  dynamicReviewsCount: number;
}

export default function UserStats({ dynamicReviewsCount }: UserStatsProps) {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const ratingsCount = useRatingsStore(
    (state) => Object.keys(state.ratings).length
  );

  const statsData = [
    {
      icon: faHeart,
      label: "Favoritos",
      value: favoritesCount,
      color: "text-red-400",
      bgColor: "bg-red-600/20",
      borderColor: "border-red-500/30",
    },
    {
      icon: faComments,
      label: "Reviews",
      value: dynamicReviewsCount,
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: faStar,
      label: "Avaliações",
      value: ratingsCount,
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
      borderColor: "border-yellow-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br from-gray-900 to-black border ${stat.borderColor} ${stat.bgColor} p-4 md:p-6 text-center rounded-lg`}
        >
          <FontAwesomeIcon
            icon={stat.icon}
            className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mb-2`}
          />
          <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

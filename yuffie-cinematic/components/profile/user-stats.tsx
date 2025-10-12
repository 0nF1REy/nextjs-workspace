"use client";

import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import { getUserStats } from "@/lib/user/users";

interface UserStatsProps {
  userId: string;
  dynamicReviewsCount: number;
}

export default function UserStats({
  userId,
  dynamicReviewsCount,
}: UserStatsProps) {
  const [stats, setStats] = useState({
    totalFavorites: 0,
    totalRatings: 0,
  });

  const loadStaticStats = useCallback(() => {
    const userStats = getUserStats(userId);
    setStats({
      totalFavorites: userStats.totalFavorites,
      totalRatings: userStats.totalRatings,
    });
  }, [userId]);

  useEffect(() => {
    loadStaticStats();
  }, [loadStaticStats]);

  useEffect(() => {
    const handleStatsUpdate = () => {
      loadStaticStats();
    };

    window.addEventListener("userFavoritesUpdated", handleStatsUpdate);
    window.addEventListener("userRatingsUpdated", handleStatsUpdate);

    return () => {
      window.removeEventListener("userFavoritesUpdated", handleStatsUpdate);
      window.removeEventListener("userRatingsUpdated", handleStatsUpdate);
    };
  }, [loadStaticStats]);

  const statsData = [
    {
      icon: faHeart,
      label: "Favoritos",
      value: stats.totalFavorites,
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
      value: stats.totalRatings,
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

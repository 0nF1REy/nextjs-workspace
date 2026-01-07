"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";

export function StatsCards() {
  const stats = {
    totalUsers: 1345,
    newMovies: 12,
    newAnimes: 8,
    newSeries: 5,
    totalReviews: 876,
    weeklyVisits: 2450,
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800/30 border-gray-700/30 text-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              <CountUp end={stats.totalUsers} duration={2.5} separator="." />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/30 border-gray-700/30 text-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Filmes (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              <CountUp end={stats.newMovies} duration={2.5} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/30 border-gray-700/30 text-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Animes (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              <CountUp end={stats.newAnimes} duration={2.5} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/30 border-gray-700/30 text-gray-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novas Séries (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-400">
              <CountUp end={stats.newSeries} duration={2.5} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

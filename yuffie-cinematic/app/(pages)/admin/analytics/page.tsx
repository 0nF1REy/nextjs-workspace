"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faEye,
  faHeart,
  faStar,
  faUsers,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import { ViewsChart } from "@/components/analytics/ViewsChart";
import { TopMoviesTable } from "@/components/analytics/TopMoviesTable";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-500 mb-2 flex items-center gap-3">
          <FontAwesomeIcon icon={faChartLine} />
          Analytics
        </h1>
        <p className="text-gray-400">Métricas e estatísticas do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0d1118] border border-blue-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">
                  Total de Visualizações
                </p>
                <p className="text-2xl font-bold text-blue-300">
                  <CountUp end={12847} duration={1.2} separator="," />
                </p>
              </div>
              <FontAwesomeIcon
                icon={faEye}
                className="text-3xl text-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-red-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">
                  Filmes Favoritos
                </p>
                <p className="text-2xl font-bold text-red-300">
                  <CountUp end={3291} duration={1.2} separator="," />
                </p>
              </div>
              <FontAwesomeIcon
                icon={faHeart}
                className="text-3xl text-red-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-yellow-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">
                  Avaliações
                </p>
                <p className="text-2xl font-bold text-yellow-300">
                  <CountUp end={8756} duration={1.2} separator="," />
                </p>
              </div>
              <FontAwesomeIcon
                icon={faStar}
                className="text-3xl text-yellow-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-green-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-green-300">
                  <CountUp end={1542} duration={1.2} separator="," />
                </p>
              </div>
              <FontAwesomeIcon
                icon={faUsers}
                className="text-3xl text-green-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0d1118] border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} />
              Gráfico de Visualizações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ViewsChart />
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <FontAwesomeIcon icon={faFilm} />
              Top Filmes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopMoviesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

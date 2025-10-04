"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, 
  faEye, 
  faHeart, 
  faStar,
  faUsers,
  faFilm
} from "@fortawesome/free-solid-svg-icons";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-500 mb-2 flex items-center gap-3">
          <FontAwesomeIcon icon={faChartLine} />
          Analytics
        </h1>
        <p className="text-gray-400">
          Métricas e estatísticas do sistema
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0d1118] border border-blue-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total de Visualizações</p>
                <p className="text-2xl font-bold text-blue-300">12,847</p>
              </div>
              <FontAwesomeIcon icon={faEye} className="text-3xl text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-red-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Filmes Favoritos</p>
                <p className="text-2xl font-bold text-red-300">3,291</p>
              </div>
              <FontAwesomeIcon icon={faHeart} className="text-3xl text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-yellow-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Avaliações</p>
                <p className="text-2xl font-bold text-yellow-300">8,756</p>
              </div>
              <FontAwesomeIcon icon={faStar} className="text-3xl text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-green-900/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-300">1,542</p>
              </div>
              <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-400" />
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
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FontAwesomeIcon icon={faChartLine} className="text-6xl mb-4 opacity-30" />
                <p>Gráfico em desenvolvimento</p>
                <p className="text-sm">Integração com biblioteca de charts</p>
              </div>
            </div>
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
            <div className="space-y-4">
              {[
                { name: "John Wick 2", views: "2,847" },
                { name: "The X-Files", views: "2,156" },
                { name: "A Time to Kill", views: "1,923" },
                { name: "Gunsmith Cats", views: "1,654" }
              ].map((movie, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">#{index + 1}</span>
                    <span className="text-gray-300">{movie.name}</span>
                  </div>
                  <span className="text-blue-400 font-medium">{movie.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

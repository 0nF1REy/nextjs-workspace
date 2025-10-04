"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AdminMoviesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <FontAwesomeIcon icon={faFilm} />
          Gerenciar Filmes
        </h1>
        <p className="text-gray-400">
          Adicione, edite e gerencie o catálogo de filmes
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0d1118] border border-red-900/40 hover:border-red-500/50 transition-colors">
          <CardContent className="p-6 text-center">
            <FontAwesomeIcon icon={faPlus} className="text-4xl text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Adicionar Filme
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Cadastre um novo filme no sistema
            </p>
            <Link href="/admin/movies/add">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Cadastrar Filme
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-blue-900/40 hover:border-blue-500/50 transition-colors">
          <CardContent className="p-6 text-center">
            <FontAwesomeIcon icon={faList} className="text-4xl text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Listar Filmes
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Visualize todos os filmes cadastrados
            </p>
            <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600/20">
              Ver Lista
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0d1118] border border-green-900/40 hover:border-green-500/50 transition-colors">
          <CardContent className="p-6 text-center">
            <FontAwesomeIcon icon={faFilm} className="text-4xl text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Estatísticas
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Relatórios e métricas dos filmes
            </p>
            <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600/20">
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#0d1118] border border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-300">Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <FontAwesomeIcon icon={faFilm} className="text-6xl mb-4 opacity-30" />
            <p>Nenhuma atividade recente</p>
            <p className="text-sm">Os filmes adicionados aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function AdminCinematicsQuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#0d1118] border border-red-900/40 hover:border-red-500/50 transition-colors">
        <CardContent className="p-6 text-center">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-4xl text-red-400 mb-4"
          />
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            Adicionar Cinematic
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Cadastre um novo cinematic no sistema
          </p>
          <Link href="/admin/cinematic/add">
            <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
              Cadastrar Cinematic
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="bg-[#0d1118] border border-blue-900/40 hover:border-blue-500/50 transition-colors">
        <CardContent className="p-6 text-center">
          <FontAwesomeIcon
            icon={faList}
            className="text-4xl text-blue-400 mb-4"
          />
          <h3 className="text-lg font-semibold text-blue-400 mb-2">
            Listar Cinematics
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Visualize todos os cinematics cadastrados
          </p>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600/20 cursor-pointer"
          >
            Ver Lista
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-[#0d1118] border border-yellow-900/40 hover:border-yellow-500/50 transition-colors">
        <CardContent className="p-6 text-center">
          <FontAwesomeIcon
            icon={faEdit}
            className="text-4xl text-yellow-400 mb-4"
          />
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Editar Cinematics
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Altere informações dos cinematics cadastrados
          </p>
          <Button
            variant="outline"
            className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20 cursor-pointer"
          >
            Editar Cinematics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

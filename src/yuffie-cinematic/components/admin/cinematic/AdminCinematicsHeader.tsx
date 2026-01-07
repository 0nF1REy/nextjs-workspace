"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export function AdminCinematicsHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
        <FontAwesomeIcon icon={faFilm} />
        Gerenciar Cinematic
      </h1>
      <p className="text-gray-400">
        Adicione, edite e gerencie o catálogo de cinematic
      </p>
    </div>
  );
}

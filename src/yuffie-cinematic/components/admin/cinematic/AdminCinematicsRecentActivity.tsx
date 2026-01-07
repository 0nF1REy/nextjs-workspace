"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilm } from "@fortawesome/free-solid-svg-icons";

export function AdminCinematicsRecentActivity() {
  return (
    <Card className="bg-[#0d1118] border border-gray-700/50 mt-8">
      <CardHeader>
        <CardTitle className="text-gray-300">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-800">
          <li className="flex items-center gap-4 py-4">
            <FontAwesomeIcon icon={faPlus} className="text-green-400 text-xl" />
            <span className="text-gray-200">
              Adicionado <b>Nausicaä of the Valley of the Wind</b>
            </span>
            <span className="ml-auto text-gray-400 text-sm">
              08/10/2025 10:12
            </span>
          </li>
          <li className="flex items-center gap-4 py-4">
            <FontAwesomeIcon icon={faPlus} className="text-green-400 text-xl" />
            <span className="text-gray-200">
              Adicionado <b>Dragon Ball</b>
            </span>
            <span className="ml-auto text-gray-400 text-sm">
              08/10/2025 09:55
            </span>
          </li>
          <li className="flex items-center gap-4 py-4">
            <FontAwesomeIcon icon={faFilm} className="text-blue-400 text-xl" />
            <span className="text-gray-200">
              Visualizado <b>Saint Seiya</b>
            </span>
            <span className="ml-auto text-gray-400 text-sm">
              08/10/2025 09:30
            </span>
          </li>
          <li className="flex items-center gap-4 py-4">
            <FontAwesomeIcon icon={faFilm} className="text-blue-400 text-xl" />
            <span className="text-gray-200">
              Visualizado <b>The Goonies</b>
            </span>
            <span className="ml-auto text-gray-400 text-sm">
              08/10/2025 09:10
            </span>
          </li>
          <li className="flex items-center gap-4 py-4">
            <FontAwesomeIcon icon={faPlus} className="text-green-400 text-xl" />
            <span className="text-gray-200">
              Adicionado <b>The Breakfast Club</b>
            </span>
            <span className="ml-auto text-gray-400 text-sm">
              08/10/2025 08:45
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

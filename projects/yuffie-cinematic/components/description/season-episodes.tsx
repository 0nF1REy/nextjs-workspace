"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Season } from "@/lib/details/types";

interface SeasonEpisodesProps {
  seasons: Season[];
  seriesTitle: string;
}

const SeasonEpisodes = ({ seasons, seriesTitle }: SeasonEpisodesProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);

  const openDialog = useCallback((season: Season) => {
    setSelectedSeason(season);
    setIsDialogOpen(true);
    setShowHighlights(false);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedSeason(null);
    setShowHighlights(false);
  }, []);

  if (!seasons || seasons.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-3xl font-extrabold text-red-500 mb-6 tracking-wide">
        Temporadas
      </h2>
      <div className="flex flex-wrap gap-3">
        {seasons.map((season) => (
          <Button
            key={season.id}
            variant="outline"
            className="border-red-700 bg-red-900/20 text-red-100 hover:bg-red-700 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
            onClick={() => openDialog(season)}
          >
            Temporada {season.seasonNumber}
          </Button>
        ))}
      </div>

      {selectedSeason && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 bg-gray-950 text-gray-100 border-red-900/40 rounded-xl overflow-hidden shadow-2xl">
            <DialogHeader className="p-4 border-b border-red-900/40 bg-gray-900">
              <DialogTitle className="text-xl sm:text-2xl text-red-500 font-bold">
                {seriesTitle} - {selectedSeason.title}
              </DialogTitle>
              {selectedSeason.synopsis && (
                <DialogDescription className="text-gray-400 text-sm mt-1">
                  {selectedSeason.synopsis}
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="p-6 flex flex-col items-center gap-6">
              {selectedSeason.cover && (
                <div className="relative w-52 h-auto aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-red-900/50">
                  <Image
                    src={selectedSeason.cover}
                    alt={`Capa da ${selectedSeason.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, 208px"
                  />
                </div>
              )}
              <Card className="bg-gray-800 border-gray-700 text-gray-200 w-full rounded-lg shadow-md">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-gray-300">
                    <strong>Ano de lançamento: </strong>
                    {selectedSeason.releaseYear || "N/A"}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Número de episódios: </strong>
                    {selectedSeason.episodes || "N/A"}
                  </p>

                  {/* Botão para ver destaques */}
                  {selectedSeason.highlights &&
                    selectedSeason.highlights.length > 0 && (
                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          className="w-full text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors duration-200"
                          onClick={() => setShowHighlights((prev) => !prev)}
                        >
                          {showHighlights
                            ? "Ocultar Destaques"
                            : "Ver Destaques"}
                        </Button>
                        {showHighlights && (
                          <div className="mt-3 bg-gray-700/30 p-3 rounded-md border border-gray-600">
                            <strong className="text-gray-200 block mb-2 text-md">
                              Destaques da Temporada:
                            </strong>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400">
                              {selectedSeason.highlights!.map(
                                (highlight, index) => (
                                  <span
                                    key={index}
                                    className="text-sm flex items-center"
                                  >
                                    {highlight}
                                    {index <
                                      selectedSeason.highlights!.length - 1 && (
                                      <span className="ml-4 text-gray-500 text-xs">
                                        •
                                      </span>
                                    )}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>

            <div className="p-4 flex justify-end border-t border-red-900/40 bg-gray-900">
              <Button
                onClick={closeDialog}
                variant="outline"
                className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-200"
              >
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default SeasonEpisodes;

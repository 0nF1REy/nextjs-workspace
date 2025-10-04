"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Item } from "@/lib/items/types";

type PageProps = {
  items: Item[];
  title: string;
};

interface ItemWithRating extends Item {
  rating?: number;
}

export default function GenericPage({ items, title }: PageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "rating">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "rating":
          aValue = (a as ItemWithRating).rating ?? 0;
          bValue = (b as ItemWithRating).rating ?? 0;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === "asc")
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

    return filtered;
  }, [items, searchTerm, sortBy, sortOrder]);

  const handleSortChange = useCallback(
    (newSortBy: "title" | "rating") => {
      if (sortBy === newSortBy)
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      else {
        setSortBy(newSortBy);
        setSortOrder("asc");
      }
    },
    [sortBy]
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen w-full bg-[#131b22] text-gray-100 pt-4 scrollbar-cinema">
      {/* Main Container / Constrained Wrapper */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="py-12 pt-24">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-2 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                {title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-400 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore nossa coleção completa de {title.toLowerCase()}. De
              clássicos marcantes a lançamentos recentes.
            </p>
          </motion.div>

          {/* Busca específica da página */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Buscar ${title.toLowerCase()}...`}
                className="bg-[#131b22]/80 text-white border border-gray-700/50 w-full pl-12 pr-12 py-3 text-lg
                         focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 
                         rounded-lg placeholder:text-gray-500 backdrop-blur-sm"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 h-5 w-5"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 
                           transition-colors duration-300 hover:scale-110"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Controles de ordenação e contador */}
          <motion.div
            className="max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-gray-400 text-sm font-medium">
                Ordenar por:
              </span>
              <Button
                variant={sortBy === "title" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleSortChange("title")}
                className={`text-sm transition-all duration-300 rounded-lg px-4 py-2
                  ${
                    sortBy === "title"
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-red-500/25 border border-red-500/20"
                      : "bg-gray-800/50 hover:bg-red-600/20 border border-gray-700/30 hover:border-red-500/50 text-gray-300 hover:text-red-300"
                  }`}
              >
                Título {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortBy === "rating" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleSortChange("rating")}
                className={`text-sm transition-all duration-300 rounded-lg px-4 py-2
                  ${
                    sortBy === "rating"
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-red-500/25 border border-red-500/20"
                      : "bg-gray-800/50 hover:bg-red-600/20 border border-gray-700/30 hover:border-red-500/50 text-gray-300 hover:text-red-300"
                  }`}
              >
                Nota {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>

            <div className="text-center bg-[#0d1118]/50 border border-red-900/40 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-gray-300 font-medium">
                {filteredAndSortedItems.length} {title.toLowerCase()} encontrado
                {filteredAndSortedItems.length !== 1 ? "s" : ""}
                {searchTerm && (
                  <span className="text-red-400 ml-1">
                    para{" "}
                    <span className="font-semibold">
                      &ldquo;{searchTerm}&rdquo;
                    </span>
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        </section>

        <section className="pb-12">
          {filteredAndSortedItems.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {filteredAndSortedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href={`/details/${item.id}`}>
                    <div
                      className="group relative bg-[#0d1118] border border-red-900/40 text-gray-200 
                               rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform cursor-pointer
                               hover:scale-105 hover:border-red-500/50 hover:brightness-110 
                               hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)]"
                    >
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3 pointer-events-none 
                                   transition-opacity duration-500 ease-out group-hover:from-red-500/8 group-hover:to-purple-500/8"
                      ></div>

                      <div className="aspect-[3/4] relative overflow-hidden">
                        <Image
                          src={item.poster}
                          alt={item.title}
                          fill
                          className="object-cover w-full h-full transition-transform duration-500 
                                   group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        />
                      </div>

                      <div className="relative z-10 p-3">
                        <div className="w-full text-center">
                          <h3
                            className="text-xs font-medium text-gray-200 truncate 
                                     transition-all duration-500 group-hover:text-red-300 
                                     group-hover:scale-105"
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="max-w-md mx-auto bg-[#0d1118] border border-red-900/40 rounded-2xl p-8 
                         shadow-lg backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3 pointer-events-none rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-red-500/50 rounded-full"></div>
                  </div>

                  {searchTerm ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-200 mb-2">
                        Nenhum resultado encontrado
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Nenhum {title.toLowerCase()} encontrado para{" "}
                        <span className="text-red-400 font-semibold">
                          &ldquo;{searchTerm}&rdquo;
                        </span>
                      </p>
                      <Button
                        onClick={clearSearch}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                                 text-white font-semibold shadow-lg transition-all duration-300 
                                 hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] 
                                 border border-red-500/20 rounded-lg"
                      >
                        Limpar busca
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-200 mb-2">
                        Nenhum conteúdo disponível
                      </h3>
                      <p className="text-gray-400">
                        Nenhum {title.toLowerCase()} encontrado
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}

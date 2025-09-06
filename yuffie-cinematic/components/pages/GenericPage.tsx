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
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100">
      <section className="px-6 md:px-12 py-12 pt-24">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
            {title}
          </h1>
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
              className="bg-gray-800 text-white border-gray-700 w-full pl-12 pr-12 py-3 text-lg"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gray-400 text-sm">Ordenar por:</span>
            <Button
              variant={sortBy === "title" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleSortChange("title")}
              className="text-xs"
            >
              Título {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button
              variant={sortBy === "rating" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleSortChange("rating")}
              className="text-xs"
            >
              Nota {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </div>

          <p className="text-gray-400 text-center">
            {filteredAndSortedItems.length} {title.toLowerCase()} encontrado
            {filteredAndSortedItems.length !== 1 ? "s" : ""}
            {searchTerm && (
              <span className="text-red-400 ml-1">
                para &ldquo;{searchTerm}&rdquo;
              </span>
            )}
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 pb-12">
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
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-lg hover:scale-105 transition-transform cursor-pointer rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={item.poster}
                        alt={item.title}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                    </div>
                    <div className="p-3">
                      <div className="w-full text-center">
                        <h3 className="text-xs font-medium text-gray-200 truncate">
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
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {searchTerm ? (
              <div>
                <p className="text-lg mb-4">
                  Nenhum {title.toLowerCase()} encontrado para &ldquo;
                  {searchTerm}&rdquo;
                </p>
                <Button onClick={clearSearch} variant="outline" size="sm">
                  Limpar busca
                </Button>
              </div>
            ) : (
              <p>Nenhum {title.toLowerCase()} encontrado</p>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
}

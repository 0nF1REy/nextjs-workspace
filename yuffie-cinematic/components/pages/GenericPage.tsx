"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Item } from "@/lib/items/types";

type PageProps = {
  items: Item[];
  title: string;
};

interface ItemWithRating extends Item {
  rating?: number;
}

export default function GenericPage({ items, title }: PageProps) {
  const [searchTerm] = useState("");
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

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100">
      <section className="px-6 md:px-12 py-12">
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

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mt-4">
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

          <p className="text-gray-400 mt-2 text-center">
            {filteredAndSortedItems.length} {title.toLowerCase()} encontrado{filteredAndSortedItems.length !== 1 ? "s" : ""}
          </p>
        </div>
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
                  <Card className="overflow-hidden rounded-lg shadow-lg border border-red-900/40 hover:border-red-600 transition-all duration-300">
                    <div className="relative h-72">
                      <Image
                        src={item.poster}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-100 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            Nenhum {title.toLowerCase()} encontrado
          </div>
        )}
      </section>
    </main>
  );
}

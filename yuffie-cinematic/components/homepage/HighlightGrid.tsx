"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/items";
import { RefObject } from "react";

interface HighlightGridProps {
  highlights: Item[];
  getCinematicDetails: (id: string) => { id: string } | undefined;
  destaquesRef: RefObject<HTMLDivElement | null>;
}

export function HighlightGrid({
  highlights,
  getCinematicDetails,
  destaquesRef,
}: HighlightGridProps) {
  return (
    <section ref={destaquesRef} className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8">
        Destaques
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 p-2 -m-2">
        {highlights.map((item, idx) => (
          <motion.div
            key={`highlight-${item.id}-${idx}`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div
              className={`group relative overflow-hidden border border-red-900/40 hover:border-red-600 
                transition-all duration-500 rounded-lg shadow-md hover:shadow-lg cursor-pointer
                hover:brightness-105 transform
                ${
                  item.id === "a-time-to-kill" ||
                  item.id === "the-x-files" ||
                  item.id === "gunsmith-cats"
                    ? 'bg-gradient-to-br from-gray-900 to-black bg-[url("/assets/animations/space-particles.gif")] bg-cover bg-center bg-no-repeat'
                    : "bg-gradient-to-br from-gray-900 to-black"
                }`}
            >
              {/* Imagem */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0.5"
                  priority={idx < 6}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-red-500/0 via-purple-500/10 to-blue-500/0 
                      opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <h3
                  className="text-base font-semibold text-gray-100 line-clamp-1 
                     transition-all duration-500 group-hover:text-cyan-300 group-hover:scale-105"
                >
                  {item.title}
                </h3>

                <Link
                  href={`/details/${encodeURIComponent(
                    getCinematicDetails(item.id)?.id || item.id
                  )}`}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-3 w-full bg-red-700 hover:bg-red-600 text-white shadow-md transition-all duration-300 group-hover:brightness-110"
                  >
                    Ver detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

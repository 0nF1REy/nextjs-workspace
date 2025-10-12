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
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          </div>
          Destaques
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 p-2 -m-2">
        {highlights.map((item, idx) => (
          <motion.div
            key={`highlight-${item.id}-${idx}`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div
              className={`group relative border border-red-900/40 text-gray-200 
                       rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform cursor-pointer
                       hover:scale-105 hover:border-red-500/50 hover:brightness-110 
                       hover:shadow-[0_10px_30px_rgba(239,68,68,0.2)]
                       ${
                         item.id === "a-time-to-kill" ||
                         item.id === "the-x-files" ||
                         item.id === "gunsmith-cats"
                           ? 'bg-[#0d1118] bg-[url("/assets/animations/space-particles.gif")] bg-cover bg-center bg-no-repeat'
                           : "bg-[#0d1118]"
                       }`}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-purple-500/3 pointer-events-none 
                           transition-opacity duration-500 ease-out group-hover:from-red-500/8 group-hover:to-purple-500/8"
              ></div>

              {/* Imagem */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 
                           group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  priority={idx < 6}
                />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 p-4">
                <h3
                  className="text-base font-semibold text-gray-200 line-clamp-1 mb-3
                           transition-all duration-500 group-hover:text-red-300 group-hover:scale-105"
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
                    className="w-full bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                             text-white font-semibold shadow-lg transition-all duration-300 
                             hover:shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] 
                             border border-red-500/20 rounded-lg"
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

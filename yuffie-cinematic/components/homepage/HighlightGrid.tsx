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
    <section ref={destaquesRef} className="px-6 md:px-12 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8">
        Destaques
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {highlights.map((item, idx) => (
          <motion.div
            key={`highlight-${item.id}-${idx}`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div
              className={`overflow-hidden border border-red-900/40 hover:border-red-600 transition rounded-lg shadow-lg ${
                item.id === "a-time-to-kill" ||
                item.id === "the-x-files" ||
                item.id === "gunsmith-cats"
                  ? 'bg-gradient-to-br from-gray-900 to-black bg-[url("/assets/animations/space-particles.gif")] bg-cover bg-center bg-no-repeat'
                  : "bg-gradient-to-br from-gray-900 to-black"
              }`}
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={idx < 6}
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-100 line-clamp-1">
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
                    className="mt-3 w-full bg-red-700 hover:bg-red-600 text-white shadow-md"
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

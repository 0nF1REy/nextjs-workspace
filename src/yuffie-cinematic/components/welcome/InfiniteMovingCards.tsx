"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAnimationFrame } from "framer-motion";
import { Item } from "@/lib/items/types";

const Column = ({
  items,
  direction = "down",
}: {
  items: Item[];
  direction?: "up" | "down";
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const y = useRef(0);
  const directionFactor = direction === "down" ? 1 : -1;

  useAnimationFrame((time, delta) => {
    if (!columnRef.current) return;

    const speedFactor = 0.04;
    const moveBy = directionFactor * speedFactor * delta;

    y.current += moveBy;

    if (
      (directionFactor > 0 && y.current > 0) ||
      (directionFactor < 0 && y.current < -columnRef.current.offsetHeight / 2)
    ) {
      y.current %= -columnRef.current.offsetHeight / 2;
    }

    columnRef.current.style.transform = `translateY(${y.current}px)`;
  });

  return (
    <div className="flex flex-col gap-4 py-4 w-48 shrink-0">
      <div ref={columnRef}>
        {[...items, ...items].map((item, idx) => (
          <Link
            href={`/details/${item.id}`}
            key={`${item.id}-${idx}`}
            className="block mb-4"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg border-2 border-zinc-900 shadow-xl">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover"
                sizes="200px"
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const InfiniteMovingCards = ({ items }: { items: Item[] }) => {
  const [columns, setColumns] = useState<Item[][]>([]);

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const numColumns = 5;
    const itemsPerColumn = Math.ceil(shuffled.length / numColumns);
    const cols = Array.from({ length: numColumns }, (_, i) => {
      const start = i * itemsPerColumn;
      const end = start + itemsPerColumn;
      return shuffled.slice(start, end);
    });
    setColumns(cols);
  }, [items]);

  if (!columns.length) return null;

  return (
    <div className="flex h-full w-full justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]">
      <div className="-rotate-12 scale-110 flex gap-4">
        {columns.map((colItems, i) => (
          <Column
            key={i}
            items={colItems}
            direction={i % 2 === 0 ? "down" : "up"}
          />
        ))}
      </div>
    </div>
  );
};

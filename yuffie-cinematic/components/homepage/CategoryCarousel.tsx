"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Item } from "@/lib/items";
import { CategoryCarouselItem } from "./CategoryCarouselItem";

interface Category {
  key: "movie" | "serie" | "anime";
  label: string;
}

interface CategoryCarouselProps {
  category: Category;
  items: Item[];
  getCinematicDetails: (id: string) => { id: string } | undefined;
}

export function CategoryCarousel({
  category,
  items,
  getCinematicDetails,
}: CategoryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => checkScrollState();
    const handleResize = () => {
      setTimeout(() => checkScrollState(), 100);
    };

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const timeoutId = setTimeout(() => checkScrollState(), 100);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkScrollState]);

  const scrollCarousel = useCallback(
    (direction: "left" | "right") => {
      const el = carouselRef.current;
      if (!el) return;

      const amount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth",
      });

      setTimeout(() => {
        checkScrollState();
      }, 300);
    },
    [checkScrollState]
  );

  const filteredItems = items.filter((i) => i.type === category.key);

  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">
        {category.label}
      </h2>
      <div className="relative py-2">
        {canScrollLeft && (
          <button
            onClick={() => scrollCarousel("left")}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
            aria-label="Scroll left"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollCarousel("right")}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
            aria-label="Scroll right"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        )}

        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-none"
          style={{
            overflowY: "visible",
            paddingTop: "8px",
            paddingBottom: "16px",
          }}
        >
          {filteredItems.map((item, idx) => (
            <CategoryCarouselItem
              key={`${category.key}-${item.id}-${idx}`}
              item={item}
              categoryKey={category.key}
              getCinematicDetails={getCinematicDetails}
              priority={idx < 3}
              idx={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

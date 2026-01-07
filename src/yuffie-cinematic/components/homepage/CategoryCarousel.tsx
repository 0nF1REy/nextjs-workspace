"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const filteredItems = items.filter((i) => i.type === category.key);

  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
          {category.label}
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
      </div>
      <div className="relative py-2">
        <button
          onClick={scrollPrev}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
          aria-label="Scroll left"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>

        <button
          onClick={scrollNext}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 p-3 rounded-full text-red-500 transition shadow-lg"
          aria-label="Scroll right"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {filteredItems.map((item, idx) => (
              <div
                key={`${category.key}-${item.id}-${idx}`}
                className="embla__slide flex-none"
              >
                <CategoryCarouselItem
                  item={item}
                  getCinematicDetails={getCinematicDetails}
                  priority={idx < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useMemo, useCallback } from "react";
import { items } from "@/lib/items";
import { cinematics, CinematicDetail } from "@/lib/details";

import { HeroVideo } from "@/components/homepage/HeroVideo";
import { HighlightGrid } from "@/components/homepage/HighlightGrid";
import { CategoryCarousel } from "@/components/homepage/CategoryCarousel";

export default function HomePage() {
  const destaquesRef = useRef<HTMLDivElement | null>(null);

  const videoItems = useMemo(() => items.filter((i) => i.video), []);

  const categories = useMemo(
    () => [
      { key: "movie" as const, label: "Filmes" },
      { key: "serie" as const, label: "Séries" },
      { key: "anime" as const, label: "Animes" },
    ],
    []
  );

  const highlightIds = useMemo(
    () => ["a-time-to-kill", "the-x-files", "gunsmith-cats", "john-wick-2"],
    []
  );

  const highlights = useMemo(
    () =>
      highlightIds
        .map((id) => items.find((item) => item.id === id))
        .filter(Boolean) as (typeof items)[0][],
    [highlightIds]
  );

  const getCinematicDetails = useCallback(
    (id: string) => cinematics.find((d: CinematicDetail) => d.id === id),
    []
  );

  const scrollToRef = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0d0d0d] via-gray-900 to-black text-gray-100">
      <HeroVideo
        videoItems={videoItems}
        getCinematicDetails={getCinematicDetails}
        scrollToRef={scrollToRef}
        destaquesRef={destaquesRef}
      />

      <HighlightGrid
        highlights={highlights}
        getCinematicDetails={getCinematicDetails}
        destaquesRef={destaquesRef}
      />

      {categories.map((cat) => (
        <CategoryCarousel
          key={cat.key}
          category={cat}
          items={items}
          getCinematicDetails={getCinematicDetails}
        />
      ))}
    </main>
  );
}

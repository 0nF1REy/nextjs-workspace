"use client";

import GenericPage from "@/components/pages/GenericPage";
import { movies } from "@/lib/items";

export default function MoviesPage() {
  return <GenericPage items={movies} title="Filmes" />;
}

"use client";

import GenericPage from "@/components/pages/GenericPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { movies } from "@/lib/items";

export default function MoviesPage() {
  return (
    <ProtectedRoute>
      <GenericPage items={movies} title="Filmes" />
    </ProtectedRoute>
  );
}

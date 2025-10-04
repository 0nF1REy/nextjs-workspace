"use client";

import GenericPage from "@/components/pages/GenericPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { series } from "@/lib/items";

export default function SeriesPage() {
  return (
    <ProtectedRoute>
      <GenericPage items={series} title="Séries" />
    </ProtectedRoute>
  );
}

"use client";

import GenericPage from "@/components/pages/GenericPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { animes } from "@/lib/items";

export default function AnimesPage() {
  return (
    <ProtectedRoute>
      <GenericPage items={animes} title="Animes" />
    </ProtectedRoute>
  );
}

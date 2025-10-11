"use client";

import GenericPage from "@/components/pages/GenericPage";
import { animes } from "@/lib/items";

export default function AnimesPage() {
  return <GenericPage items={animes} title="Animes" />;
}

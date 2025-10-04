"use client";

import { useMigrateLocalStorage } from "@/stores/useMigrateLocalStorage";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Migração de dados do localStorage para Zustand na primeira renderização
  useMigrateLocalStorage();

  return <>{children}</>;
}

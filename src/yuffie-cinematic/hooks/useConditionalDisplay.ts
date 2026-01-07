"use client";

import { usePathname } from "next/navigation";

interface UseConditionalDisplayOptions {
  hideOnPaths?: string[];
  showOnlyOnPaths?: string[];
}

/**
 * Hook para controlar exibição condicional de componentes baseado na rota
 * @param hideOnPaths - Array de caminhos onde o componente não deve aparecer
 * @param showOnlyOnPaths - Array de caminhos onde o componente deve aparecer (exclusivo)
 * @returns boolean indicando se o componente deve ser exibido
 */
export function useConditionalDisplay({
  hideOnPaths = [],
  showOnlyOnPaths = [],
}: UseConditionalDisplayOptions = {}): boolean {
  const pathname = usePathname();

  if (!pathname) return true;

  // Se especificado showOnlyOnPaths, só mostra se a rota atual estiver na lista
  if (showOnlyOnPaths.length > 0) {
    return showOnlyOnPaths.some((path) => pathname.startsWith(path));
  }

  // Se especificado hideOnPaths, esconde se a rota atual estiver na lista
  if (hideOnPaths.length > 0) {
    return !hideOnPaths.some((path) => pathname.startsWith(path));
  }

  return true;
}

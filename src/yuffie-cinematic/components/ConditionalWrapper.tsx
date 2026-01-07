"use client";

import { useConditionalDisplay } from "@/hooks/useConditionalDisplay";

interface ConditionalWrapperProps {
  children: React.ReactNode;
  hideOnPaths?: string[];
  showOnlyOnPaths?: string[];
}

/**
 * Componente wrapper que renderiza condicionalmente baseado na rota atual
 */
export function ConditionalWrapper({
  children,
  hideOnPaths = [],
  showOnlyOnPaths = [],
}: ConditionalWrapperProps) {
  const shouldShow = useConditionalDisplay({ hideOnPaths, showOnlyOnPaths });

  if (!shouldShow) {
    return null;
  }

  return <>{children}</>;
}

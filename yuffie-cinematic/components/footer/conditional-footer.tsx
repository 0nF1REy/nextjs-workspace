"use client";

import { usePathname } from "next/navigation";
import { FooterComponent } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Não mostrar footer nas páginas admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <FooterComponent />;
}

"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./SearchBar";

export function HeaderComponent() {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-red-500">
          <FontAwesomeIcon icon={faFilm} className="h-6 w-6" />
          <span className="font-bold text-lg tracking-wide">
            Yuffie's Cinematic
          </span>
        </Link>

        {/* Navegação */}
        <DesktopNav />

        {/* Busca */}
        <div className="flex-1 md:flex-none flex items-center justify-center md:justify-end gap-2">
          <SearchBar />
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
}

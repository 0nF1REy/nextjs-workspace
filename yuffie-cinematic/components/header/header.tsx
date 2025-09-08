"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./SearchBar";
import { UserProfile } from "./user-profile";

export function HeaderComponent() {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-4 md:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-red-500">
          <FontAwesomeIcon icon={faFilm} className="h-6 w-6" />
          <span className="hidden md:block font-bold text-lg tracking-wide">
            Yuffie&apos;s Cinematic
          </span>
        </Link>

        {/* Navegação Desktop */}
        <DesktopNav />

        {/* Busca e Perfil Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          <UserProfile />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <SearchBar />
          <UserProfile />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

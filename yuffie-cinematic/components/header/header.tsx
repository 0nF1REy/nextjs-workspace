"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

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
        <div className="hidden md:flex items-center gap-2">
          <Input
            type="text"
            placeholder="Buscar filmes..."
            className="bg-gray-800 text-white border-gray-700"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-red-600 hover:bg-red-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

export function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0E0E0] bg-[#FAFAFA]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo e Ícone */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#4B5D73]"
        >
          <FontAwesomeIcon icon={faFilm} className="h-16 text-[#D33B3B]" />
          <span className="hidden sm:inline">Yuffie's Cinematic</span>
        </Link>

        {/* Campo de Busca */}
        <div className="flex flex-1 justify-end">
          <div className="flex w-full items-center space-x-2 sm:max-w-xs">
            <Input
              type="text"
              placeholder="Busque um filme"
              className="h-9 rounded-md px-3 text-[#212121] placeholder:text-[#9E9E9E] border border-[#E0E0E0] focus:ring-2 focus:ring-[#A3D9E2] focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-md bg-[#D33B3B] text-[#FFFFFF] hover:bg-[#B83131]"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
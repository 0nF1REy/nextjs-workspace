"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function FooterComponent() {
  return (
    <footer className="w-full bg-white border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Links */}
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4">
          <Link
            href="/legal?tab=aviso"
            className={cn(
              "text-sm text-gray-500 hover:text-gray-700 transition-colors text-center px-2 py-1"
            )}
          >
            Aviso Legal
          </Link>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <Link
            href="/legal?tab=privacidade"
            className={cn(
              "text-sm text-gray-500 hover:text-gray-700 transition-colors text-center px-2 py-1"
            )}
          >
            Política de Privacidade
          </Link>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <Link
            href="/legal?tab=termos"
            className={cn(
              "text-sm text-gray-500 hover:text-gray-700 transition-colors text-center px-2 py-1"
            )}
          >
            Termos de Uso
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400 px-4">
          © 2025 Yuffie Cinematic. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

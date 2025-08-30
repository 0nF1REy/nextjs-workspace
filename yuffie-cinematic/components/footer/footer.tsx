"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function FooterComponent() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Links */}
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-4">
          <Link
            href="/legal?tab=aviso"
            className={cn(
              "text-sm text-gray-400 transition-colors text-center px-2 py-1 uppercase tracking-wide font-medium hover:text-red-600 hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]"
            )}
          >
            Aviso Legal
          </Link>
          <div className="hidden sm:block w-px h-4 bg-gray-700" />
          <Link
            href="/legal?tab=privacidade"
            className={cn(
              "text-sm text-gray-400 transition-colors text-center px-2 py-1 uppercase tracking-wide font-medium hover:text-red-600 hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]"
            )}
          >
            Política de Privacidade
          </Link>
          <div className="hidden sm:block w-px h-4 bg-gray-700" />
          <Link
            href="/legal?tab=termos"
            className={cn(
              "text-sm text-gray-400 transition-colors text-center px-2 py-1 uppercase tracking-wide font-medium hover:text-red-600 hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]"
            )}
          >
            Termos de Uso
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500 px-4">
          &copy; {new Date().getFullYear()}
          <span className="text-red-600 font-semibold"> Yuffie Cinematic</span>.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

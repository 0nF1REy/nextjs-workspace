"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/risco", label: "Risco" },
  { href: "/ajuda", label: "Ajuda" },
  { href: "/prevencao", label: "Prevenção" },
  { href: "/tratamento", label: "Tratamento" },
  { href: "/consequencia", label: "Consequência" },
  { href: "/tcc", label: "TCC" },
];

export function NavLinks({
  onClick,
  isMobile,
}: {
  onClick?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname() || "/";

  return (
    <div
      className={isMobile ? "flex flex-col gap-4" : "flex items-center gap-6"}
    >
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        const defaultNonTcc = isMobile
          ? "text-base font-medium text-gray-700 hover:text-blue-600 transition py-2"
          : "text-sm font-medium text-gray-700 hover:text-blue-600 transition";

        const activeNonTcc = isMobile
          ? "text-base font-medium text-blue-600 py-2"
          : "text-sm font-medium text-blue-600";

        const tccNonActive = isMobile
          ? "text-base font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition text-center"
          : "text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition";

        const tccActive = isMobile
          ? "text-base font-medium bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-md transition text-center shadow-sm"
          : "text-sm font-medium bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition shadow-sm ring-1 ring-blue-200";

        let className = "";
        if (link.label === "TCC") {
          className = isActive ? tccActive : tccNonActive;
        } else {
          className = isActive ? activeNonTcc : defaultNonTcc;
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={className}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

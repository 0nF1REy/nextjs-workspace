"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "./nav-items";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "text-red-500"
              : "text-gray-300 hover:text-white"
          )}
        >
          <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

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
            "relative flex items-center gap-2 text-sm font-medium transition-colors",
            "after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px]",
            "after:bg-red-500 after:origin-center after:transform after:transition-transform after:duration-300",
            pathname === item.href
              ? "text-red-500"
              : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100"
          )}
        >
          <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

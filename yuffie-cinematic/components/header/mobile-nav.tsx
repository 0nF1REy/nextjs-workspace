"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { navItems } from "./nav-items";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 rounded-md hover:bg-gray-700 transition">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-white" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-black text-white">
        <SheetHeader>
          <SheetTitle className="text-red-500 text-lg">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

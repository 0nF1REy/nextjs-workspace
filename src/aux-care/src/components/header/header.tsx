"use client";

import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-screen-2xl py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/auxcare-label.png"
            alt="AuxCare+"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <DesktopNav />
        </div>

        {/* Mobile */}
        <MobileNav />
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./SearchBar";
import { UserProfile } from "./user-profile";

export function HeaderComponent() {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/assets/images/brand/yuffie-cinematic-isotipo.png"
              alt="Yuffie's Cinematic Icon"
              width={55}
              height={55}
              priority
            />
          </Link>
          <div className="hidden md:block">
            <Link href="/">
              <Image
                src="/assets/images/brand/yuffie-cinematic-logotipo-01.png"
                alt="Yuffie's Cinematic Logo"
                width={192}
                height={24}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <DesktopNav />
          <div className="flex items-center gap-4 ml-50">
            <SearchBar />
            <UserProfile />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <SearchBar />
          <UserProfile />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

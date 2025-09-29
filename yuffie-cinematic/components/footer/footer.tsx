"use client";

import React from "react";
import { BrandLogo } from "./brand-logo";
import { LinkColumns } from "./link-columns";
import { BottomBar } from "./bottom-bar";
import { SocialLinksBar } from "./social-links-bar";
import { BrandIsotype } from "./brand-isotype";

export function FooterComponent() {
  return (
    <footer className="w-full bg-[#0d1118] border-t border-gray-800 mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SocialLinksBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <BrandLogo />
          <LinkColumns />
          <BrandIsotype />
        </div>

        <BottomBar />
      </div>
    </footer>
  );
}

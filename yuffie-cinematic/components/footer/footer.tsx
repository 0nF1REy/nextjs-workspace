"use client";

import React from "react";
import { FooterBrand } from "./FooterBrand";
import { FooterLinkColumns } from "./FooterLinkColumns";
import { FooterBottomBar } from "./FooterBottomBar";

export function FooterComponent() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <FooterBrand />
          <FooterLinkColumns />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
}

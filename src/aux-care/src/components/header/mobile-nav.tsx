"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-6 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex-1 px-6 py-6">
            <NavLinks onClick={() => setOpen(false)} isMobile={true} />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { NavLinks } from "./nav-links";

export function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6 hidden md:flex">
        <NavigationMenuItem>
          <NavLinks />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

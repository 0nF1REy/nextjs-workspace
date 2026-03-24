"use client";

import { useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from "./types";

interface TccSidebarProps {
  navItems: NavItem[];
  activeId: string;
}

export function TccSidebar({ navItems, activeId }: TccSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "sticky top-16 z-20 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="grid items-start gap-2">
              {navItems.map((item) => (
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeId === item.id ? "secondary" : "ghost"}
                      className={cn(
                        "flex items-center justify-start gap-3 transition-all",
                        isCollapsed ? "px-2" : "px-3"
                      )}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {isCollapsed ? (
                        <span className="w-6 text-center font-medium">
                          {item.numbering}
                        </span>
                      ) : item.icon ? (
                        <span className="h-4 w-4 flex items-center justify-center">
                          {item.icon}
                        </span>
                      ) : null}

                      <span
                        className={cn(
                          "truncate transition-opacity",
                          isCollapsed ? "sr-only" : "opacity-100"
                        )}
                        style={{
                          marginLeft: !isCollapsed
                            ? item.level === 3
                              ? "2rem"
                              : item.level === 2
                              ? "1rem"
                              : "0"
                            : "0",
                        }}
                      >
                        {item.numbering} {item.title}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.numbering} {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <Button
              variant="outline"
              size="icon"
              className="w-full"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronsRight className="h-5 w-5" />
              ) : (
                <ChevronsLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

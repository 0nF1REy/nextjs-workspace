"use client";

import { FooterComponent } from "./footer";
import { useConditionalDisplay } from "@/hooks/useConditionalDisplay";

export function ConditionalFooter() {
  const shouldShow = useConditionalDisplay({
    hideOnPaths: ["/admin"],
  });

  if (!shouldShow) {
    return null;
  }

  return <FooterComponent />;
}

import React from "react";
import { cn } from "@/lib/utils";

type ContentWrapperProps = React.PropsWithChildren<{
  className?: string;
  maxWidth?: string;
}>;

export function ContentWrapper({
  children,
  className,
  maxWidth = "max-w-7xl",
  ...props
}: ContentWrapperProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", maxWidth, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;

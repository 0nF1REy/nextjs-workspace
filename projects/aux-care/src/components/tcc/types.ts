import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  title: string;
  icon?: ReactNode;
  level: 1 | 2 | 3;
  numbering: string;
}

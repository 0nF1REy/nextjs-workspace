import Link from "next/link";
import { FC, ReactNode } from "react";

interface BadgeCardProps {
  title: string;
  icon: ReactNode;
  href: string;
  bgColor?: string;
  className?: string;
}

export const BadgeCard: FC<BadgeCardProps> = ({
  title,
  icon,
  href,
  bgColor = "bg-white",
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-lg border border-black/20 ${bgColor} hover:shadow-md transition-shadow cursor-pointer h-full ${className}`}
    >
      <div className="text-black text-xl">{icon}</div>
      <span className="font-semibold text-black text-base">{title}</span>
    </Link>
  );
};

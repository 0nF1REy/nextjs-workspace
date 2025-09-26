import Link from "next/link";
import { legalLinks } from "./footer-data";

export function FooterBottomBar() {
  return (
    <div className="mt-12 border-t border-gray-800 pt-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Yuffie&apos;s Cinematic. Todos os
          direitos reservados.
        </p>
        <div className="flex items-center gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { footerSections } from "./footer-data";

export function FooterLinkColumns() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-base font-semibold text-white mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

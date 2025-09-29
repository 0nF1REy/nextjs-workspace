import Link from "next/link";
import { footerSections } from "./footer-data";

export function LinkColumns() {
  return (
    <>
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex gap-8 justify-center mb-8">
          {footerSections.slice(0, 2).map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-semibold text-red-500 mb-4 text-center">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        relative inline-block w-full px-2 py-1.5 -mx-2 rounded-md border border-transparent
                        text-sm text-gray-400 font-medium text-center
                        transition-all duration-300 ease-in-out
                        hover:text-white hover:bg-red-600/10 hover:border-red-500/40
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#131b22]
                        active:scale-95
                        after:content-[''] after:absolute after:left-2 after:bottom-1 after:w-[calc(100%-1rem)] after:h-[2px] after:bg-red-500 after:opacity-0 after:scale-x-0 after:origin-left after:transition-all after:duration-300 hover:after:opacity-100 hover:after:scale-x-100
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-base font-semibold text-red-500 mb-4">
            {footerSections[2].title}
          </h3>
          <ul className="space-y-1 inline-block">
            {footerSections[2].links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="
                    relative inline-block w-full px-2 py-1.5 -mx-2 rounded-md border border-transparent
                    text-sm text-gray-400 font-medium text-center
                    transition-all duration-300 ease-in-out
                    hover:text-white hover:bg-red-600/10 hover:border-red-500/40
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#131b22]
                    active:scale-95
                    after:content-[''] after:absolute after:left-2 after:bottom-1 after:w-[calc(100%-1rem)] after:h-[2px] after:bg-red-500 after:opacity-0 after:scale-x-0 after:origin-left after:transition-all after:duration-300 hover:after:opacity-100 hover:after:scale-x-100
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-8">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-semibold text-red-500 mb-4">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      relative inline-block w-full px-2 py-1.5 -mx-2 rounded-md border border-transparent
                      text-sm text-gray-400 font-medium
                      transition-all duration-300 ease-in-out
                      hover:text-white hover:bg-red-600/10 hover:border-red-500/40
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#131b22]
                      active:scale-95
                      after:content-[''] after:absolute after:left-2 after:bottom-1 after:w-[calc(100%-1rem)] after:h-[2px] after:bg-red-500 after:opacity-0 after:scale-x-0 after:origin-left after:transition-all after:duration-300 hover:after:opacity-100 hover:after:scale-x-100
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

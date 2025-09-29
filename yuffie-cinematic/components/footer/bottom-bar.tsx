import Link from "next/link";
import Image from "next/image";
import { legalLinks } from "./footer-data";

export function BottomBar() {
  return (
    <div className="mt-12 border-t-2 border-gray-700 pt-8">
      <div className="flex flex-col gap-6">
        {/* Logos parceiros */}
        <div className="flex flex-wrap justify-center gap-6">
          <Image
            src="/assets/images/partners/alpha-logotipo.svg"
            alt="Alpha Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
          <Image
            src="/assets/images/partners/ard-1-plus-logotipo.svg"
            alt="ARD 1 PLUS Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
          <Image
            src="/assets/images/partners/tagesschau-24-logotipo.svg"
            alt="tagesschau 24 Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
          <Image
            src="/assets/images/partners/rbb-logotipo.svg"
            alt="rbb Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
          <Image
            src="/assets/images/partners/das-erste-logotipo.svg"
            alt="Das Erste Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
          <Image
            src="/assets/images/partners/3-sat-logotipo.svg"
            alt="3 sat Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
                    <Image
            src="/assets/images/partners/3-sat-logotipo.svg"
            alt="3 sat Logo"
            width={60}
            height={30}
            className="
              hover:scale-110
              hover:rotate-12
              hover:-translate-y-1
              hover:drop-shadow-[0_0_10px_rgb(255,0,0)]
              transition-transform
              duration-300
              ease-in-out
            "
          />
        </div>

        {/* Legal + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Yuffie&apos;s Cinematic. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { legalLinks } from "./footer-data";

export function BottomBar() {
  return (
    <div className="mt-12 border-t-2 border-gray-700 pt-8">
      <div className="flex flex-col gap-6">
        {/* Logos parceiros */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              src: "/assets/images/partners/alpha-logotipo.svg",
              alt: "Alpha Logo",
              href: "https://www.ardalpha.de/",
            },
            {
              src: "/assets/images/partners/ard-1-plus-logotipo.svg",
              alt: "ARD 1 PLUS Logo",
              href: "https://www.ardplus.de/",
            },
            {
              src: "/assets/images/partners/rbb-logotipo.svg",
              alt: "rbb Logo",
              href: "https://www.rbb24.de/",
            },
            {
              src: "/assets/images/partners/das-erste-logotipo.svg",
              alt: "Das Erste Logo",
              href: "https://www.daserste.de/",
            },
            {
              src: "/assets/images/partners/3-sat-logotipo.svg",
              alt: "3 sat Logo",
              href: "https://www.3sat.de/",
            },
            {
              src: "/assets/images/partners/2-df-logotipo.svg",
              alt: "2 DF Logo",
              href: "https://www.zdf.de/",
            },
            {
              src: "/assets/images/partners/swr-logotipo.svg",
              alt: "SWR Logo",
              href: "https://www.swr.de/",
            },
            {
              src: "/assets/images/partners/phoenix-logotipo.svg",
              alt: "Phoenix Logo",
              href: "https://www.phoenix.de/",
            },
            {
              src: "/assets/images/partners/one-logotipo.svg",
              alt: "one Logo",
              href: "https://www.ardmediathek.de/one",
            },
          ].map((logo, idx) => (
            <a
              key={idx}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={60}
                height={30}
                className="
                    opacity-60
                    grayscale
                    brightness-75
                    contrast-90
                    hover:opacity-90
                    hover:grayscale-0
                    hover:brightness-80
                    hover:contrast-95
                    hover:scale-110
                    hover:rotate-12
                    hover:-translate-y-1
                    hover:drop-shadow-[0_0_8px_rgb(255,0,0)]
                    transition
                    duration-300
                    ease-in-out
                  "
              />
            </a>
          ))}
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

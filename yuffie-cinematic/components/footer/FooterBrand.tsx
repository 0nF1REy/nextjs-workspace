import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "./footer-data";

export function FooterBrand() {
  return (
    <div className="max-w-sm">
      <div className="relative h-20 mb-4">
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
          <Link href="/">
            <Image
              src="/assets/images/brand/yuffie-cinematic-isotipo.png"
              alt="Yuffie's Cinematic Icon"
              width={100}
              height={100}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="relative h-40 w-48 ml-3">
            <Link href="/">
              <Image
                src="/assets/images/brand/yuffie-cinematic-logotipo-02.png"
                alt="Yuffie's Cinematic Logo"
                fill
                className="object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        Sua plataforma para explorar o universo de filmes, séries e animes.
        Descubra, avalie e compartilhe suas paixões.
      </p>
      <div className="flex items-center gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="text-gray-500 transition-colors hover:text-red-500"
          >
            <social.icon className="size-5" />
          </a>
        ))}
      </div>
    </div>
  );
}

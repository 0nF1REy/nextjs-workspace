"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export function FooterComponent() {
  const footerSections = [
    {
      title: "Plataforma",
      links: [
        { href: "/movies", label: "Filmes" },
        { href: "/series", label: "Séries" },
        { href: "/animes", label: "Animes" },
      ],
    },
    {
      title: "Comunidade",
      links: [
        { href: "#", label: "Discussões" },
        { href: "#", label: "Grupos" },
        { href: "#", label: "Recomendações" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { href: "#", label: "Sobre Nós" },
        { href: "#", label: "Contato" },
        { href: "#", label: "Carreiras" },
      ],
    },
  ];

  const socialLinks = [
    { href: "#", label: "Instagram", icon: FaInstagram },
    { href: "#", label: "Facebook", icon: FaFacebook },
    { href: "#", label: "Twitter", icon: FaTwitter },
    { href: "#", label: "Linkedin", icon: FaLinkedin },
  ];

  const legalLinks = [
    { href: "/legal?tab=aviso", label: "AVISO LEGAL" },
    { href: "/legal?tab=termos", label: "TERMOS DE USO" },
    { href: "/legal?tab=privacidade", label: "POLÍTICA DE PRIVACIDADE" },
  ];

  return (
    <footer className="w-full bg-black border-t border-gray-800 mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-sm">
            {/* --- Seção do Logo --- */}
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

                {/* Logotipo de texto */}
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
              Sua plataforma para explorar o universo de filmes, séries e
              animes. Descubra, avalie e compartilhe suas paixões.
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
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Yuffie&apos;s Cinematic. Todos
              os direitos reservados.
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
      </div>
    </footer>
  );
}

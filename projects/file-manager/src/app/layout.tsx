import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const metadata: Metadata = {
  title: "Stardust Sparkle Files",
  description:
    "Seu espaço pessoal para uploads, onde arquivos brilham com estilo.",
  keywords: [
    "upload de arquivos",
    "armazenamento online",
    "gerenciador de arquivos",
    "Stardust Sparkle Files",
    "upload seguro",
    "armazenamento pessoal",
  ],
  creator: "Alan Ryan da Silva Domingues",
  robots: "index, follow",
  openGraph: {
    title: "Stardust Sparkle Files",
    description:
      "Seu espaço pessoal para uploads, onde arquivos brilham com estilo.",
    url: siteUrl,
    siteName: "Stardust Sparkle Files",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Stardust Sparkle Files - Espaço pessoal para uploads",
      },
    ],
  },
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/assets/favicon/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default Layout;

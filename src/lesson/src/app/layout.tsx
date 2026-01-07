import "./globals.css";

import { HeaderComponent } from "@/components/header/header";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprendizagem - Next JS do zero!",
  description: "Aprendendo  procedimentos com Next JS",
  openGraph: {
    title: "Home - Aula Next JS do zero!",
    description: "Aprendendo  procedimentos com Next JS",
    images: ["https://images4.alphacoders.com/195/195666.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <HeaderComponent />
        {children}
      </body>
    </html>
  );
}

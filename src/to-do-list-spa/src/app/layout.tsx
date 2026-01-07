import type { Metadata } from "next";

import "./globals.scss";
import { PageFooter } from "@/components/page-footer/page-footer";

export const metadata: Metadata = {
  title: "Lista de Tarefas",
  description: "Minha lista de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
        <PageFooter />
      </body>
    </html>
  );
}

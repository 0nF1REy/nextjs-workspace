import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MySidebarComponent from "@/components/my-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bem-Vindo!",
  description: "Página para estudo de Next JS 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-row`}
      >
        <SidebarProvider>
          <MySidebarComponent />
          <div className="flex flex-col grow bg-amber-300">
            <header className="bg-[#010101] text-white min-h-2/12 h-3/12">
              <SidebarTrigger />
              Cabeçalho
            </header>

            <main className="bg-[#007000] text-white flex flex-col justify-center items-center grow">
              {children}
            </main>
            <footer className="bg-[#000070] text-white min-h-2/12 h-3/12">
              Rodapé
            </footer>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

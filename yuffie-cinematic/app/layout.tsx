import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { HeaderComponent } from "@/components/header/header";
import { FooterComponent } from "@/components/footer/footer";
import { ConditionalWrapper } from "@/components/ConditionalWrapper";
import { StoreProvider } from "@/components/providers/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuffie's Cinematic",
  description: "Sistema Web - Yuffie's Cinematic",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <StoreProvider>
          <ConditionalWrapper hideOnPaths={["/admin"]}>
            <HeaderComponent />
          </ConditionalWrapper>
          <main className="flex-1">{children}</main>
          <ConditionalWrapper hideOnPaths={["/admin"]}>
            <FooterComponent />
          </ConditionalWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderComponent } from "@/components/header/header";
import { FooterComponent } from "@/components/footer/footer";
import { ConditionalWrapper } from "@/components/ConditionalWrapper";
import { StoreProvider } from "@/components/providers/StoreProvider";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import type { User } from "@/lib/user/types";
import SessionInitializer from "@/components/providers/SessionInitializer";

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

async function getUserFromCookie(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(sessionCookie, secret);

    return payload as unknown as User;
  } catch (error) {
    console.error("Token de sessão inválido:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserFromCookie();

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <StoreProvider>
          <SessionInitializer user={user} />

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

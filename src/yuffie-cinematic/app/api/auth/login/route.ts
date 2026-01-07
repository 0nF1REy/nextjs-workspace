import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { users } from "@/lib/user/users";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Busca usuário pelo email e senha
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (foundUser) {
    // Monta payload seguro para JWT (sem senha)
    const jwtPayload = Object.fromEntries(
      Object.entries(foundUser).filter(([key]) => key !== "password")
    );
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const token = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    // cookies() retorna uma Promise, então aguarde
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    // Retorna o usuário sem a senha
    return NextResponse.json(jwtPayload);
  }

  return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
}

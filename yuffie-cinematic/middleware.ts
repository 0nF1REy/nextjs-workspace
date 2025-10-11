import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Função auxiliar para verificar o JWT
async function verifyToken(token: string) {
  if (!token) return null;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;
  const userPayload = await verifyToken(sessionCookie || "");

  const isAuthenticated = !!userPayload;
  const isAdmin = userPayload?.userType === "admin";

  const authRoutes = ["/auth/login", "/auth/register"];
  const adminRoutes = ["/admin"];
  const protectedRoutes = ["/profile"];

  // 1. Redirecionar usuários logados para fora das páginas de autenticação
  if (
    isAuthenticated &&
    authRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Proteger rotas de Administrador
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Proteger rotas de usuário
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configuração do Matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};

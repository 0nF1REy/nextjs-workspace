import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Função executada em todas as requisições que o middleware intercepta
async function verifyToken(token: string) {
  // Se não houver token, não há usuário para verificar
  if (!token) return null;

  // Obtenção e codificação da chave secreta JWT das variáveis de ambiente para validação do token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    // Tenta verificar o token. Se for válido, retorna o payload (dados do usuário)
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Extração do caminho da URL
  const { pathname } = request.nextUrl;

  // Tenta pegar o cookie de sessão do navegador do usuário.
  const sessionCookie = request.cookies.get("session")?.value;

  // Verificação do token e obtenção dos dados do usuário, se o token for válido.
  const userPayload = await verifyToken(sessionCookie || "");

  // Definição das flags booleanas
  const isAuthenticated = !!userPayload;
  const isAdmin = userPayload?.userType === "admin";

  // Se um admin acessar a página inicial, redirecione-o para o dashboard.
  if (isAdmin && pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Definição das diferentes categorias de rotas
  const authRoutes = ["/auth/login", "/auth/register"];

  const adminRoutes = ["/admin"];

  // Páginas que exigem login
  const protectedRoutes = [
    "/profile",
    "/details",
    "/newsletter",
    "/contact",
    "/welcome",
  ];

  // Regra 1: Se o usuário já está logado, não o deixe ver as páginas de login/registro
  if (
    isAuthenticated &&
    authRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Regra 2: Proteger as rotas de administrador
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Regra 3: Proteger todas as outras rotas definidas em 'protectedRoutes'
  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Configuração do Matcher
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|api/auth|_next/webpack-hmr).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authenticated = false;

  if (request.nextUrl.pathname.startsWith("/dashboard") && !authenticated) {
    const url = request.nextUrl.clone();

    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

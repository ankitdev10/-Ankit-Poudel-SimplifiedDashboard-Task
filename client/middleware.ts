import { NextRequest, NextResponse } from "next/server";

import cookieParser from "cookie";
import { AUTH_TOKEN_KEY } from "./config/constants";

export async function middleware(request: NextRequest) {
  const cookies = request.headers.get("cookie");

  //
  // TODO: add from query param
  //

  if (!cookies) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const cookieStore = cookieParser.parse(cookies || "");
  if (!cookieStore[AUTH_TOKEN_KEY]) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (login page)
     * - request-reset-password (request reset password page)
     * - account/password-reset (password reset page)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|login|request-reset-password|account/password-reset).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

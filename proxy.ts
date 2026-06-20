import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SECRET_COOKIE } from "./lib/admin-secret";

export function proxy(request: NextRequest) {
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminSecret = request.nextUrl.searchParams.get("admin_secret");
    const cookieSecret = request.cookies.get(ADMIN_SECRET_COOKIE)?.value;
    const expectedSecret = process.env.ADMIN_SECRET;

    // Allow access to /admin-access page without secret
    if (request.nextUrl.pathname === "/admin-access") {
      return NextResponse.next();
    }

    // Check for valid secret
    if (
      (!adminSecret || adminSecret !== expectedSecret) &&
      (!cookieSecret || cookieSecret !== expectedSecret)
    ) {
      return NextResponse.redirect(new URL("/admin-access", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

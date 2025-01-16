import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Retrieve the JWT token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  // Authorization rules for specific routes
  if (pathname.startsWith("/dashboard/admin")) {
    // Admin routes: Allowed for "manager" and "admin"
    if (!["manager", "admin"].includes(token.role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (pathname.startsWith("/dashboard/player")) {
    // Player routes: Allowed for "manager" and "admin"
    if (!["manager", "admin"].includes(token.role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (pathname.startsWith("/dashboard")) {
    // General dashboard: Allowed for all roles
    if (!["user", "manager", "admin"].includes(token.role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Allow access if authorized
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all /dashboard routes
};

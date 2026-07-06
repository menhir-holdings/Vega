import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";
const PROTECTED_API = ["/api/workspace", "/api/albums", "/api/site"];

export function middleware(request: NextRequest) {
  if (process.env.VEGA_AUTH_DISABLED === "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith(ADMIN_PREFIX);
  const isProtectedApi = PROTECTED_API.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const isWrite =
    request.method !== "GET" && request.method !== "HEAD";

  if (!isAdminPage && !(isProtectedApi && isWrite)) {
    return NextResponse.next();
  }

  // Owner mode: allow through (single-tenant deploy behind Vercel password or similar)
  // Clerk mode: middleware will validate session once wired
  if (process.env.CLERK_SECRET_KEY) {
    // Phase 2: return auth().protect() from @clerk/nextjs
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/workspace/:path*", "/api/albums/:path*", "/api/site/:path*"],
};

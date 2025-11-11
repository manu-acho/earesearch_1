import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  console.log("🔒 Middleware called for:", pathname);
  
  // Allow access to public admin pages
  const publicAdminPages = ["/admin/login", "/admin/request-access"];
  if (publicAdminPages.includes(pathname)) {
    console.log("✅ Allowing access to public admin page");
    return NextResponse.next();
  }
  
  // Check if user is authenticated for all other /admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    console.log("🔑 Token found:", !!token);
    
    if (!token) {
      console.log("❌ No token - redirecting to login");
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log("✅ Token valid - allowing access");
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

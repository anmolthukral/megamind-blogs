import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Prevent unconditional redirects when the app is being proxied by the gateway.
// Only redirect root requests to '/blogs' when the request is directly to the
// blogs app host (megamind-blogs.vercel.app). When proxied through
// engineerplaybook.io (or any other host), do not redirect so the gateway can
// serve the content at the gateway path without causing a loop.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // Only consider the bare root path (no trailing slash normalization here).
  // if (url.pathname === "/") {
  //   // Replace this host with your blogs project's canonical host if different.
  //   const BLOGS_HOST = "megamind-blogs.vercel.app";

  //   if (host === BLOGS_HOST) {
  //     url.pathname = "/blogs";
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

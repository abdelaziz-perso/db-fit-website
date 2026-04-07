import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (segments.length === 0) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/`;
    return NextResponse.redirect(url);
  }

  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  // Let 2-letter paths hit [locale] so invalid codes (e.g. /de) return 404 from the layout.
  if (segments.length === 1 && segments[0].length === 2) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}/${segments.join("/")}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

/**
 * Same idea as `nextjs-portfolio-2026/lib/i18n/routing.ts`: default locale paths omit `/fr`.
 * DB FIT adds `ar` and copies French silos to the site root after export.
 */
import type { Locale } from "./config";
import { pagePath, parseLocalePathname } from "./url";

export function withLocale(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const slug =
    normalized === "/" ? "" : normalized.replace(/^\/+|\/+$/g, "");
  return pagePath(locale, slug);
}

export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const { locale, slugTail } = parseLocalePathname(pathname);
  const p = slugTail ? `/${slugTail}` : "/";
  return { locale, path: p };
}

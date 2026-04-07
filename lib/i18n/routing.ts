/**
 * Même modèle que `nextjs-portfolio-2026/lib/i18n/routing.ts`, avec locale `ar` en plus.
 * Accueil français = `/` ; pages françaises = `/fr/slug/` (pas de copie à la racine).
 */
import { defaultLocale, isLocale, type Locale } from "./config";
import { pagePath } from "./url";

export function withLocale(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const slug =
    normalized === "/" ? "" : normalized.replace(/^\/+|\/+$/g, "");
  return pagePath(locale, slug);
}

/**
 * Retire le segment de locale si présent. `/` = home FR. Chemin sans locale = `locale: null`
 * (ex. ancienne URL) pour que `withLocale` reconstruise `/fr/...`.
 */
export function stripLocale(pathname: string): {
  locale: Locale | null;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return { locale: defaultLocale, path: "/" };
  }
  const first = segments[0];
  if (isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, path: rest ? `/${rest}` : "/" };
  }
  return { locale: null, path: `/${segments.join("/")}` };
}

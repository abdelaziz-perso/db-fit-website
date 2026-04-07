import { defaultLocale, locales, type Locale } from "./config";

const HREFLANG: Record<Locale, string> = {
  fr: "fr-MA",
  en: "en",
  ar: "ar-MA",
};

/**
 * Comme nextjs-portfolio-2026 `withLocale` : accueil FR = `/` ; toutes les autres pages
 * ont le segment de locale (`/fr/...`, `/en/...`, `/ar/...`).
 */
export function pagePath(locale: Locale, slug: string): string {
  const s = slug.replace(/^\/+|\/+$/g, "");
  if (!s) {
    return locale === defaultLocale ? "/" : `/${locale}/`;
  }
  return `/${locale}/${s}/`;
}

/** Hash sur la home de la locale (`/#contact`, `/en/#contact`, `/fr/#contact` si jamais servi). */
export function localizedHashPath(locale: Locale, fragment: string): string {
  const id = fragment.replace(/^#/, "");
  const home = pagePath(locale, "");
  return home === "/" ? `/#${id}` : `${home}#${id}`;
}

/** `alternates.languages` + x-default pour metadata / sitemap */
export function hreflangAlternates(slug: string): Record<string, string> {
  const s = slug.replace(/^\/+|\/+$/g, "");
  const out: Record<string, string> = {};
  for (const loc of locales) {
    out[HREFLANG[loc]] = pagePath(loc, s);
  }
  out["x-default"] = pagePath(defaultLocale, s);
  return out;
}

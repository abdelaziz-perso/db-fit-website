import { defaultLocale, isLocale, locales, type Locale } from "./config";

const HREFLANG: Record<Locale, string> = {
  fr: "fr-MA",
  en: "en",
  ar: "ar-MA",
};

/**
 * URL path with `trailingSlash: true` — default locale (fr) has no `/fr` prefix.
 */
export function pagePath(locale: Locale, slug: string): string {
  const s = slug.replace(/^\/+|\/+$/g, "");
  if (!s) {
    return locale === defaultLocale ? "/" : `/${locale}/`;
  }
  if (locale === defaultLocale) {
    return `/${s}/`;
  }
  return `/${locale}/${s}/`;
}

/** Hash link on the locale home (e.g. `/#contact`, `/en/#contact`). */
export function localizedHashPath(locale: Locale, fragment: string): string {
  const id = fragment.replace(/^#/, "");
  const home = pagePath(locale, "");
  return home === "/" ? `/#${id}` : `${home}#${id}`;
}

/**
 * Parse pathname from the router (leading locale segment only for en/ar legacy paths;
 * unprefixed paths are treated as default locale).
 */
export function parseLocalePathname(pathname: string): {
  locale: Locale;
  slugTail: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return { locale: defaultLocale, slugTail: "" };
  }
  if (isLocale(parts[0])) {
    return { locale: parts[0], slugTail: parts.slice(1).join("/") };
  }
  return { locale: defaultLocale, slugTail: parts.join("/") };
}

export function switchLocaleHref(pathname: string, targetLocale: Locale): string {
  const { slugTail } = parseLocalePathname(pathname);
  return pagePath(targetLocale, slugTail);
}

/** `alternates.languages` + x-default for metadata */
export function hreflangAlternates(slug: string): Record<string, string> {
  const s = slug.replace(/^\/+|\/+$/g, "");
  const out: Record<string, string> = {};
  for (const loc of locales) {
    out[HREFLANG[loc]] = pagePath(loc, s);
  }
  out["x-default"] = pagePath(defaultLocale, s);
  return out;
}

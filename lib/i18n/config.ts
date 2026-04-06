export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "عربي",
};

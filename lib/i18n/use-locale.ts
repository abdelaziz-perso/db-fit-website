"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Locale courante dérivée de l’URL (`/[locale]/…`), pour les Client Components
 * (équivalent pratique à un segment `[locale]` côté serveur).
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) return first;
  return defaultLocale;
}

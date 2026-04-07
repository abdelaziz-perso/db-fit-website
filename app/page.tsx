import { LocaleHomePage } from "@/components/home/LocaleHomePage";
import { defaultLocale } from "@/lib/i18n/config";
import { hreflangAlternates, pagePath } from "@/lib/i18n/url";
import type { Metadata } from "next";

/**
 * French home at `/` (no `/fr` prefix). After static export, `scripts/copy-default-locale.mjs`
 * also mirrors `out/fr/*` into `out/` so deep links match the same URLs.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: pagePath(defaultLocale, ""),
      languages: hreflangAlternates(""),
    },
    openGraph: {
      url: pagePath(defaultLocale, ""),
    },
  };
}

export default function RootPage() {
  return <LocaleHomePage locale={defaultLocale} />;
}

import { LocaleHomePage } from "@/components/home/LocaleHomePage";
import { defaultLocale } from "@/lib/i18n/config";
import { hreflangAlternates, pagePath } from "@/lib/i18n/url";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { buildLocaleMetadata } from "@/lib/seo/build-locale-metadata";
import { SiteGraphJsonLd } from "@/lib/seo/json-ld";
import type { Metadata } from "next";

/** Accueil FR sur `/` : métadonnées complètes + JSON-LD (le segment `[locale]` ne wrap pas cette route). */
export async function generateMetadata(): Promise<Metadata> {
  const base = buildLocaleMetadata(defaultLocale);
  const homePath = pagePath(defaultLocale, "");
  return {
    ...base,
    alternates: {
      canonical: homePath,
      languages: hreflangAlternates(""),
    },
    openGraph: {
      ...base.openGraph,
      url: absoluteUrl(homePath),
    },
  };
}

export default function RootPage() {
  return (
    <>
      <SiteGraphJsonLd locale={defaultLocale} />
      <LocaleHomePage locale={defaultLocale} />
    </>
  );
}

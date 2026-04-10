import { getMessages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { keywordsForLocale } from "@/lib/seo/keywords";
import { siteConfig } from "@/lib/site/config";
import type { Metadata } from "next";

/**
 * Métadonnées complètes (title, OG, Twitter, mots-clés) pour une locale.
 * Les URLs d’images OG sont absolues (requis pour les réseaux).
 */
export function buildLocaleMetadata(locale: Locale): Metadata {
  const m = getMessages(locale);
  const ogLocale =
    locale === "fr" ? "fr_MA" : locale === "ar" ? "ar_MA" : "en_US";

  const ogImage = siteConfig.heroPosterUrl.startsWith("http")
    ? siteConfig.heroPosterUrl
    : absoluteUrl(siteConfig.heroPosterUrl);

  return {
    title: m.meta.title,
    description: m.meta.description,
    keywords: keywordsForLocale(locale),
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: siteConfig.brand,
      title: m.meta.ogTitle ?? m.meta.title,
      description: m.meta.ogDescription ?? m.meta.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: m.meta.ogTitle ?? m.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.meta.ogTitle ?? m.meta.title,
      description: m.meta.ogDescription ?? m.meta.description,
      images: [ogImage],
    },
  };
}

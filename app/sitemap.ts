import { defaultLocale, locales } from "@/lib/i18n/config";
import { SILO_SLUGS } from "@/lib/i18n/silo-routes";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { hreflangAlternates, pagePath } from "@/lib/i18n/url";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function languageAlternatesForSlug(slug: string): Record<string, string> {
  const rel = hreflangAlternates(slug);
  return Object.fromEntries(
    Object.entries(rel).map(([code, path]) => [code, absoluteUrl(path)]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of locales) {
    const homePath = pagePath(loc, "");
    entries.push({
      url: absoluteUrl(homePath),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: loc === defaultLocale ? 1 : 0.95,
      alternates: { languages: languageAlternatesForSlug("") },
    });
  }

  for (const slug of SILO_SLUGS) {
    const isPillar = slug === "gym-dar-bouazza";
    for (const loc of locales) {
      const p = pagePath(loc, slug);
      entries.push({
        url: absoluteUrl(p),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: isPillar ? 0.95 : 0.85,
        alternates: { languages: languageAlternatesForSlug(slug) },
      });
    }
  }

  return entries;
}

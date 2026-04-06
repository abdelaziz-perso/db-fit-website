import { locales } from "@/lib/i18n/config";
import { SILO_SLUGS } from "@/lib/i18n/silo-routes";
import { siteConfig } from "@/lib/site/config";
import type { MetadataRoute } from "next";

const SILO_PATHS = SILO_SLUGS.map((s) => `/${s}` as const);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of locales) {
    entries.push({
      url: `${base}/${loc}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
    for (const path of SILO_PATHS) {
      const isPillar = path === "/gym-dar-bouazza";
      entries.push({
        url: `${base}/${loc}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: isPillar ? 0.95 : 0.85,
      });
    }
  }

  return entries;
}

import { defaultLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { siteConfig } from "@/lib/site/config";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const m = getMessages(defaultLocale);

  return {
    name: siteConfig.brand,
    short_name: siteConfig.brand,
    description: m.meta.description,
    start_url: "/",
    scope: "/",
    display: "browser",
    lang: defaultLocale,
    dir: "ltr",
    theme_color: "#18181b",
    background_color: "#fafafa",
    categories: ["fitness", "sports", "health", "lifestyle"],
    icons: [
      {
        src: "/icon.png",
        type: "image/png",
        sizes: "48x48",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "any",
      },
    ],
  };
}

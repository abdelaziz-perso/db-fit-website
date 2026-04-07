import { LocaleHomePage } from "@/components/home/LocaleHomePage";
import { defaultLocale } from "@/lib/i18n/config";
import { hreflangAlternates, pagePath } from "@/lib/i18n/url";
import type { Metadata } from "next";

/** Home français à `/` — même schéma que nextjs-portfolio-2026 (pages FR ailleurs sous `/fr/...`). */
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

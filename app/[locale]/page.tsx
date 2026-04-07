import { LocaleHomePage } from "@/components/home/LocaleHomePage";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { hreflangAlternates, pagePath } from "@/lib/i18n/url";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  /** Duplicate `/fr/` home: canonical is `/` (see nextjs-portfolio-2026 `app/[locale]/page.tsx`). */
  if (locale === defaultLocale) {
    return {
      alternates: { canonical: pagePath(defaultLocale, "") },
      robots: { index: false, follow: true },
    };
  }
  return {
    alternates: {
      canonical: pagePath(locale, ""),
      languages: hreflangAlternates(""),
    },
    openGraph: {
      url: pagePath(locale, ""),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  if (locale === defaultLocale) {
    permanentRedirect("/");
  }
  return <LocaleHomePage locale={locale} />;
}

import { keywordsForLocale } from "@/lib/seo/keywords";
import { SiteGraphJsonLd } from "@/lib/seo/json-ld";
import { siteConfig } from "@/lib/site/config";
import { getMessages } from "@/lib/i18n/get-messages";
import {
  isLocale,
  localeDirection,
  type Locale,
} from "@/lib/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const m = getMessages(locale);
  const ogLocale =
    locale === "fr" ? "fr_MA" : locale === "ar" ? "ar_MA" : "en_US";

  return {
    title: m.meta.title,
    description: m.meta.description,
    keywords: keywordsForLocale(locale),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        fr: "/fr/",
        en: "/en/",
        ar: "/ar/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `/${locale}/`,
      siteName: siteConfig.brand,
      title: m.meta.ogTitle ?? m.meta.title,
      description: m.meta.ogDescription ?? m.meta.description,
      images: [
        {
          url: siteConfig.heroPosterUrl,
          width: 1200,
          height: 630,
          alt: m.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.meta.ogTitle ?? m.meta.title,
      description: m.meta.ogDescription ?? m.meta.description,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dir = localeDirection(locale);

  return (
    <>
      <SiteGraphJsonLd locale={locale} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      <div
        className={
          locale === "ar"
            ? "flex min-h-full flex-1 flex-col font-arabic"
            : "flex min-h-full flex-1 flex-col font-sans"
        }
      >
        {children}
      </div>
    </>
  );
}

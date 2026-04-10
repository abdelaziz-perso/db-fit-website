import { buildLocaleMetadata } from "@/lib/seo/build-locale-metadata";
import { SiteGraphJsonLd } from "@/lib/seo/json-ld";
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
  return buildLocaleMetadata(locale);
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

import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import type { SiloPages } from "@/lib/i18n/types-silo";
import { PAGE_KEY_TO_SLUG } from "@/lib/i18n/silo-routes";
import type { Metadata } from "next";

export function siloPageMetadata(
  locale: Locale,
  pageKey: keyof SiloPages,
): Metadata {
  const c = getMessages(locale).siloPages[pageKey];
  const slug = PAGE_KEY_TO_SLUG[pageKey];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/${locale}/${slug}` },
  };
}

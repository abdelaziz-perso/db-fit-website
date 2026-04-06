import { SiloMoneyPage } from "@/components/silo-money-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { siloPageMetadata } from "@/lib/seo/silo-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return siloPageMetadata(raw as Locale, "salleSportTamaris");
}

export default async function SalleSportTamarisPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <SiloMoneyPage locale={raw as Locale} pageKey="salleSportTamaris" />;
}

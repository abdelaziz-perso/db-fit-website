import { LandingShell } from "@/components/landing-shell";
import { MoneyPageArticle } from "@/components/money-page-article";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import type { SiloPages } from "@/lib/i18n/types-silo";
import { whatsappHref } from "@/lib/site/config";

type Props = {
  locale: Locale;
  pageKey: keyof SiloPages;
};

export function SiloMoneyPage({ locale, pageKey }: Props) {
  const content = getMessages(locale).siloPages[pageKey];
  const waHref = whatsappHref(content.waMessage);

  return (
    <LandingShell locale={locale}>
      <MoneyPageArticle
        locale={locale}
        content={content}
        waHref={waHref}
      />
    </LandingShell>
  );
}

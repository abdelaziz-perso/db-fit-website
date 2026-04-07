import { FooterCredit } from "@/components/footer-credit";
import { SiteHeader } from "@/components/site-header";
import { SocialIconLinks } from "@/components/social-icon-links";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StickyWhatsapp } from "@/components/sticky-whatsapp";
import type { Locale } from "@/lib/i18n/config";
import { pagePath } from "@/lib/i18n/url";
import { getMessages } from "@/lib/i18n/get-messages";
import { whatsappDirectHref } from "@/lib/site/config";
import Link from "next/link";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

export async function LandingShell({ locale, children }: Props) {
  const m = getMessages(locale);
  const waSticky = whatsappDirectHref();

  return (
    <div className="flex min-h-full min-w-0 flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <SiteHeader locale={locale} nav={m.nav} />
      <main className="flex-1 min-w-0 px-3 py-12 sm:px-6 sm:py-16 md:py-24">
        {children}
      </main>
      <footer className="border-t border-zinc-200 bg-zinc-100 py-10 text-center dark:border-white/10 dark:bg-black">
        <Link
          href={pagePath(locale, "")}
          className="text-sm font-bold uppercase tracking-wide text-brand hover:underline"
        >
          {m.footer.backHome}
        </Link>
        <SocialIconLinks className="mt-6" iconClassName="h-5 w-5" />
        <FooterCredit prefix={m.footer.createdByPrefix} />
      </footer>
      <StickyWhatsapp href={waSticky} label={m.hero.ctaWhatsapp} />
      <ScrollToTop label={m.nav.backToTop} />
    </div>
  );
}

import { Activities } from "@/components/home/Activities";
import { Coaching } from "@/components/home/Coaching";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";
import { Spaces } from "@/components/home/Spaces";
import { Testimonials } from "@/components/home/Testimonials";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StickyWhatsapp } from "@/components/sticky-whatsapp";
import { FooterCredit } from "@/components/footer-credit";
import { SocialIconLinks } from "@/components/social-icon-links";
import type { Locale } from "@/lib/i18n/config";
import { pagePath } from "@/lib/i18n/url";
import { getMessages } from "@/lib/i18n/get-messages";
import {
  whatsappDirectHref,
  telHref,
  whatsappHref,
} from "@/lib/site/config";
import Link from "next/link";

type Props = { locale: Locale };

export async function LocaleHomePage({ locale }: Props) {
  const m = getMessages(locale);
  const waTrial = whatsappHref(m.hero.trialWaMessage);
  const waJoin = whatsappHref(m.hero.joinWaMessage);
  const waPricing = whatsappHref(m.pricing.waMessage);
  const waCoachingQuick = whatsappHref(m.coachingLead.quickWaMessage);
  const waSticky = whatsappDirectHref();
  const phoneHref = telHref();

  return (
    <div className="flex min-h-full min-w-0 flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <SiteHeader locale={locale} nav={m.nav} />
      <main className="flex-1">
        <Hero
          locale={locale}
          hero={m.hero}
          waTrialHref={waTrial}
          waJoinHref={waJoin}
          telHref={phoneHref}
        />
        <Features features={m.features} />
        <Spaces spaces={m.spaces} />
        <Activities activities={m.activities} />
        <Coaching
          coaches={m.coachesSection}
          bookCoach={m.bookCoach}
          lead={m.coachingLead}
          quickWaHref={waCoachingQuick}
        />
        <Pricing pricing={m.pricing} waHref={waPricing} />
        <Testimonials testimonials={m.testimonials} />
        <Faq locale={locale} faq={m.faq} />
        <Contact
          contact={m.contact}
          waDefaultMessage={m.hero.joinWaMessage}
        />
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-100 py-10 text-center dark:border-white/10 dark:bg-black">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {m.footer.line}
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-600">
          {m.footer.rights}
        </p>
        <SocialIconLinks className="mt-6" />
        <nav
          className="mt-8 flex max-w-full flex-wrap justify-center gap-x-4 gap-y-1 px-2 text-xs text-zinc-500 dark:text-zinc-600 sm:gap-x-6 sm:gap-y-2"
          aria-label="Liens utiles"
        >
          <Link
            href={pagePath(locale, "gym-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoGym}
          </Link>
          <Link
            href={pagePath(locale, "fitness-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoFitness}
          </Link>
          <Link
            href={pagePath(locale, "coaching-sportif-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoCoaching}
          </Link>
          <Link
            href={pagePath(locale, "salle-femmes-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoSalleFemmes}
          </Link>
          <Link
            href={pagePath(locale, "fitness-mixte-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoFitnessMixte}
          </Link>
          <Link
            href={pagePath(locale, "salle-de-sport-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoSalleSport}
          </Link>
          <Link
            href={pagePath(locale, "abonnement-gym-dar-bouazza")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoAbonnement}
          </Link>
          <Link
            href={pagePath(locale, "programme-musculation-debutant")}
            className="inline-flex min-h-11 items-center px-1 hover:text-brand"
          >
            {m.footer.seoProgrammeDebutant}
          </Link>
        </nav>
        <FooterCredit prefix={m.footer.createdByPrefix} />
      </footer>

      <StickyWhatsapp href={waSticky} label={m.hero.ctaWhatsapp} />
      <ScrollToTop label={m.nav.backToTop} />
    </div>
  );
}

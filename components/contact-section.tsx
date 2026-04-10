import { ContactWhatsappForm } from "@/components/contact-whatsapp-form";
import { Reveal } from "@/components/motion/reveal";
import { SocialIconLinks } from "@/components/social-icon-links";
import type { Messages } from "@/lib/i18n/types";
import { siteConfig, telHref, whatsappHref } from "@/lib/site/config";
import Link from "next/link";

type Props = {
  contact: Messages["contact"];
  waDefaultMessage: string;
};

export function ContactSection({ contact, waDefaultMessage }: Props) {
  const waLink = whatsappHref(waDefaultMessage);

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {contact.kicker}
          </p>
          <h2
            id="contact-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {contact.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal delay={0.05}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {contact.addressLabel}
                </h3>
                <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
                  {siteConfig.address.streetAddress}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {siteConfig.address.addressLocality},{" "}
                  {siteConfig.address.addressCountry}
                </p>
                <p className="mt-3 max-w-md text-sm font-semibold leading-snug text-zinc-800 dark:text-zinc-200">
                  {contact.napLine}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {contact.hoursLabel}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {contact.hoursValue}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={telHref()}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-900 transition-colors hover:border-brand hover:text-brand-fg dark:border-white/20 dark:text-white dark:hover:text-brand"
                >
                  {contact.phoneLabel}: {siteConfig.phoneDisplay}
                </a>
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-black uppercase tracking-wide text-white"
                >
                  {contact.waLabel}
                </Link>
              </div>
              <SocialIconLinks
                className="justify-start pt-1"
                iconClassName="h-6 w-6"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactWhatsappForm
              formTitle={contact.formTitle}
              formName={contact.formName}
              formPhone={contact.formPhone}
              formMessage={contact.formMessage}
              formSubmit={contact.formSubmit}
              formWaPrefix={contact.formWaPrefix}
              formSending={contact.formSending}
              formSuccess={contact.formSuccess}
              formError={contact.formError}
              formWaPopupBlocked={contact.formWaPopupBlocked}
            />
          </Reveal>
        </div>

        {siteConfig.contactMapEnabled ? (
          <Reveal delay={0.12}>
            <div className="mt-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {contact.mapTitle}
              </h3>
              <div className="mt-4 space-y-3">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900">
                  <iframe
                    title={contact.mapTitle}
                    src={siteConfig.googleMapsEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p className="text-center">
                  <a
                    href={siteConfig.googleMapsOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
                  >
                    {contact.mapOpenGoogleLabel}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

import { Reveal } from "@/components/motion/reveal";
import { FaqJsonLd } from "@/lib/seo/faq-json-ld";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  faq: Messages["faq"];
};

export function Faq({ locale, faq }: Props) {
  return (
    <>
      <FaqJsonLd items={faq.items} />
      <section
        id="faq"
        className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-20 dark:border-white/10 dark:bg-zinc-950"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
              {faq.kicker}
            </p>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
            >
              {faq.heading}
            </h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faq.items.map((item) => (
              <Reveal key={item.question}>
                <details className="group rounded-2xl border border-zinc-200 bg-white px-4 py-1 shadow-sm dark:border-white/10 dark:bg-zinc-900/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 font-bold text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                    <span
                      className="text-start text-sm md:text-base"
                      lang={
                        locale === "ar"
                          ? "ar"
                          : locale === "fr"
                            ? "fr"
                            : "en"
                      }
                    >
                      {item.question}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-brand transition-transform duration-200 group-open:rotate-45 dark:bg-zinc-800">
                      +
                    </span>
                  </summary>
                  <p
                    className="border-t border-zinc-100 pb-4 pt-3 text-sm leading-relaxed text-zinc-600 dark:border-white/5 dark:text-zinc-400 md:text-base"
                    lang={
                      locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en"
                    }
                  >
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

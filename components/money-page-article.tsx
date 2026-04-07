import type { Locale } from "@/lib/i18n/config";
import type { MoneyPageContent } from "@/lib/i18n/types-silo";
import { pagePath } from "@/lib/i18n/url";
import { FaqJsonLd } from "@/lib/seo/faq-json-ld";
import Link from "next/link";

type Props = {
  locale: Locale;
  content: MoneyPageContent;
  waHref: string;
};

export function MoneyPageArticle({ locale, content, waHref }: Props) {
  return (
    <>
      <FaqJsonLd items={content.faq} />
      <article className="mx-auto min-w-0 max-w-3xl break-words px-1 sm:px-0">
        <h1 className="text-[length:clamp(1.375rem,4vw+0.5rem,3rem)] font-black uppercase leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-3xl md:text-5xl">
          {content.h1}
        </h1>

        {content.lead.map((p) => (
          <p
            key={p.slice(0, 48)}
            className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg"
          >
            {p}
          </p>
        ))}

        {content.sections.map((section) => (
          <section
            key={section.h2}
            className="mt-14 border-t border-zinc-200 pt-12 first:border-t-0 first:pt-0 dark:border-white/10"
            aria-labelledby={`h2-${slugify(section.h2)}`}
          >
            <h2
              id={`h2-${slugify(section.h2)}`}
              className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-3xl"
            >
              {section.h2}
            </h2>
            {section.paragraphs.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg"
              >
                {p}
              </p>
            ))}
            {section.subsections?.map((sub) => (
              <div key={sub.h3} className="mt-8">
                <h3 className="text-lg font-bold uppercase tracking-wide text-brand">
                  {sub.h3}
                </h3>
                {sub.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </section>
        ))}

        {content.faq.length > 0 ? (
          <section
            className="mt-16 border-t border-zinc-200 pt-12 dark:border-white/10"
            aria-labelledby="faq-heading"
          >
            <h2
              id="faq-heading"
              className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-3xl"
            >
              {content.faqSectionTitle}
            </h2>
            <div className="mt-8 space-y-3">
              {content.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 dark:border-white/10 dark:bg-zinc-900/40"
                >
                  <summary className="cursor-pointer list-none font-bold text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-2">
                      {item.question}
                      <span className="text-brand transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12">
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-brand px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            {content.cta}
          </Link>
        </div>

        {content.relatedLinks.length > 0 ? (
          <nav
            className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-100 p-6 dark:border-white/10 dark:bg-zinc-900/30"
            aria-label={content.relatedSectionTitle}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              {content.relatedSectionTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {content.relatedLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={pagePath(locale, link.slug)}
                    className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:text-brand-fg hover:underline dark:text-zinc-300 dark:hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
    </>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .slice(0, 48);
}

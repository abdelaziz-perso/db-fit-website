import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";
import Link from "next/link";

type Props = {
  finalCta: Messages["finalCta"];
  waHref: string;
  telHref: string;
};

export function FinalCtaSection({ finalCta, waHref, telHref }: Props) {
  return (
    <section
      className="border-b border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-50 to-white py-20 md:py-24 dark:border-white/10 dark:from-zinc-900 dark:via-zinc-950 dark:to-black"
      aria-labelledby="final-cta-title"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2
            id="final-cta-title"
            className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {finalCta.title}
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand">
            {finalCta.urgency}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              {finalCta.startToday}
            </Link>
            <Link
              href={telHref}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full border-2 border-zinc-800 bg-transparent px-8 py-4 text-sm font-black uppercase tracking-wide text-zinc-900 transition-colors hover:border-brand hover:text-brand-fg dark:border-white/50 dark:text-white dark:hover:border-brand dark:hover:text-brand sm:w-auto"
            >
              {finalCta.ctaCall}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

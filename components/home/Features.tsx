import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";
import {
  FEATURE_CARD_ICONS,
  IconSparkleBadge,
} from "@/components/home/feature-icons";

type Props = { features: Messages["features"] };

/**
 * « Pourquoi DB FIT » — contenu distinct du hero (pas de répétition localisation / pitch).
 */
export function Features({ features }: Props) {
  return (
    <section
      id="pourquoi-db-fit"
      className="scroll-mt-28 border-b border-zinc-200 bg-white py-16 md:py-20 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-fg dark:text-brand"
              aria-hidden
            >
              <IconSparkleBadge className="h-5 w-5" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
              {features.kicker}
            </p>
          </div>
          <h2
            id="features-heading"
            className="mt-3 max-w-2xl text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {features.title}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
            {features.intro}
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item, i) => {
            const CardIcon =
              FEATURE_CARD_ICONS[i % FEATURE_CARD_ICONS.length];
            return (
            <Reveal key={item.slice(0, 48)} delay={i * 0.05}>
              <li className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-white/10 dark:bg-zinc-900/40">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-fg/10 text-brand-muted dark:from-brand/25 dark:to-brand-deep/30 dark:text-brand"
                  aria-hidden
                >
                  <CardIcon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-800 dark:text-zinc-200 md:text-base">
                  {item}
                </p>
              </li>
            </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

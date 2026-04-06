import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import type { Messages } from "@/lib/i18n/types";
import Link from "next/link";

type Props = {
  pricing: Messages["pricing"];
  waHref: string;
};

export function PricingSection({ pricing, waHref }: Props) {
  return (
    <section
      id="tarifs"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-100/80 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-900/30"
      aria-labelledby="tarifs-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {pricing.kicker}
          </p>
          <h2
            id="tarifs-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {pricing.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-medium text-[#f97316]">
            {pricing.promo}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricing.cards.map((card, i) => (
            <Reveal key={card.name} delay={i * 0.07}>
              <TiltCard
                className={`flex h-full flex-col p-6 ${card.highlight ? "ring-2 ring-brand/60" : ""}`}
              >
                {card.highlight ? (
                  <span className="mb-3 inline-block w-fit rounded-full bg-brand/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand">
                    {pricing.popularBadge}
                  </span>
                ) : null}
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-white">
                  {card.name}
                </h3>
                <p className="mt-2 font-mono text-2xl font-bold text-brand">
                  {card.price}
                  <span className="text-sm font-normal text-zinc-500">
                    {card.period}
                  </span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {card.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-brand" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-8 text-center text-xs text-zinc-500">
            {pricing.footnote}
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-brand px-8 py-3.5 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              {pricing.cta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

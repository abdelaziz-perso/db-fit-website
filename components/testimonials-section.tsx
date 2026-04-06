import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";

type Props = { testimonials: Messages["testimonials"] };

export function TestimonialsSection({ testimonials }: Props) {
  return (
    <section
      id="temoignages"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="temoignages-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {testimonials.kicker}
          </p>
          <h2
            id="temoignages-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {testimonials.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/50">
                <p className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  “{t.quote}”
                </p>
                <footer className="mt-6 border-t border-zinc-200 pt-4 dark:border-white/10">
                  <cite className="not-italic">
                    <span className="block font-bold text-zinc-900 dark:text-white">
                      {t.name}
                    </span>
                    <span className="text-xs text-zinc-500">{t.role}</span>
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

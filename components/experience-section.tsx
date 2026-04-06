import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";

type Props = { experience: Messages["experience"] };

export function ExperienceSection({ experience }: Props) {
  const blocks = [
    experience.equipment,
    experience.coaches,
    experience.atmosphere,
    experience.community,
  ];

  return (
    <section
      id="experience"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {experience.kicker}
          </p>
          <h2
            id="experience-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {experience.title}
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {blocks.map((text, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-50 p-6 text-sm leading-relaxed text-zinc-700 dark:border-white/10 dark:from-zinc-900/80 dark:to-zinc-950 dark:text-zinc-300">
                {text}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

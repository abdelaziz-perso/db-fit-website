import { Reveal } from "@/components/motion/reveal";
import { ACTIVITY_IMAGES } from "@/lib/site/activities-media";
import type { Messages } from "@/lib/i18n/types";
import Image from "next/image";

type Props = { activities: Messages["activities"] };

export function ActivitiesSection({ activities }: Props) {
  const cards: { label: string; alt: string; src: string }[] = [
    {
      label: activities.strength,
      alt: activities.strengthAlt,
      src: ACTIVITY_IMAGES[0],
    },
    {
      label: activities.cardio,
      alt: activities.cardioAlt,
      src: ACTIVITY_IMAGES[1],
    },
    {
      label: activities.cross,
      alt: activities.crossAlt,
      src: ACTIVITY_IMAGES[2],
    },
    {
      label: activities.coaching,
      alt: activities.coachingAlt,
      src: ACTIVITY_IMAGES[3],
    },
  ];

  return (
    <section
      id="activites"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-100/90 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-900/40"
      aria-labelledby="activites-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {activities.kicker}
          </p>
          <h2
            id="activites-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {activities.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors hover:border-brand/50 dark:border-white/10 dark:bg-zinc-950/80">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent dark:from-zinc-950/70" />
                </div>
                <p className="px-4 py-4 text-center text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  {card.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import type { Messages } from "@/lib/i18n/types";
import Image from "next/image";

const IMAGES = {
  women:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80&auto=format&fit=crop",
  mixed:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80&auto=format&fit=crop",
  men: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80&auto=format&fit=crop",
} as const;

type Props = { spaces: Messages["spaces"] };

export function SpacesSection({ spaces }: Props) {
  const cards = [
    {
      title: spaces.womenTitle,
      desc: spaces.womenDesc,
      src: IMAGES.women,
      alt: spaces.womenAlt,
    },
    {
      title: spaces.mixedTitle,
      desc: spaces.mixedDesc,
      src: IMAGES.mixed,
      alt: spaces.mixedAlt,
    },
    {
      title: spaces.menTitle,
      desc: spaces.menDesc,
      src: IMAGES.men,
      alt: spaces.menAlt,
    },
  ];

  return (
    <section
      id="espaces"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="espaces-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {spaces.kicker}
          </p>
          <h2
            id="espaces-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {spaces.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <TiltCard className="group h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/90 via-transparent to-transparent dark:from-zinc-950" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {c.desc}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

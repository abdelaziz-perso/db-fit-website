import { BookCoachSection } from "@/components/book-coach-section";
import { CoachesSection } from "@/components/coaches-section";
import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";
import Link from "next/link";

type Props = {
  coaches: Messages["coachesSection"];
  bookCoach: Messages["bookCoach"];
  lead: Messages["coachingLead"];
  quickWaHref: string;
};

/**
 * Bloc conversion : présentation équipe + réservation coach (WhatsApp).
 */
export function Coaching({
  coaches,
  bookCoach,
  lead,
  quickWaHref,
}: Props) {
  return (
    <section
      id="coaching"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-100/80 py-16 md:py-20 dark:border-white/10 dark:bg-zinc-900/30"
      aria-labelledby="coaching-section-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {lead.kicker}
          </p>
          <h2
            id="coaching-section-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {lead.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
            {lead.intro}
          </p>
          <Link
            href={quickWaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            {lead.quickWaLabel}
          </Link>
        </Reveal>

        <CoachesSection coaches={coaches} embedded />
        <BookCoachSection bookCoach={bookCoach} embedded />
      </div>
    </section>
  );
}

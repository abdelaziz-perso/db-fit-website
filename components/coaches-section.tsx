import { Reveal } from "@/components/motion/reveal";
import { COACH_MEDIA } from "@/lib/site/coaches-media";
import type { Messages } from "@/lib/i18n/types";
import { coachWhatsappHref, siteConfig } from "@/lib/site/config";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = { coaches: Messages["coachesSection"]; embedded?: boolean };

function CoachSocialIcon({
  href,
  label,
  variant = "default",
  children,
}: {
  href: string;
  label: string;
  variant?: "default" | "whatsapp";
  children: ReactNode;
}) {
  const chrome =
    variant === "whatsapp"
      ? "border-zinc-300 text-whatsapp hover:border-whatsapp hover:bg-whatsapp/10 hover:text-whatsapp-hover dark:border-white/20 dark:hover:border-whatsapp dark:hover:bg-whatsapp/15"
      : "border-zinc-300 text-zinc-700 hover:border-brand hover:text-brand-fg dark:border-white/20 dark:text-zinc-300 dark:hover:text-brand";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variant === "whatsapp" ? "focus-visible:outline-whatsapp" : "focus-visible:outline-brand"} ${chrome}`}
      aria-label={label}
    >
      {children}
    </Link>
  );
}

const coachMediaResolved = [
  {
    ...COACH_MEDIA[0],
    instagram: siteConfig.mehdiInstagramUrl,
    facebook: siteConfig.mehdiFacebookUrl,
  },
  { ...COACH_MEDIA[1] },
] as const;

export function CoachesSection({ coaches, embedded }: Props) {
  const inner = (
    <>
      {!embedded ? (
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {coaches.kicker}
          </p>
          <h2
            id="coachs-title"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
          >
            {coaches.title}
          </h2>
        </Reveal>
      ) : null}

      <div
        className={`grid gap-8 sm:grid-cols-2 ${embedded ? "mt-0" : "mt-12"}`}
        aria-label={embedded ? coaches.title : undefined}
      >
          {coaches.items.map((coach, i) => {
            const media = coachMediaResolved[i];
            if (!media) return null;

            const igAria =
              i === 0 ? coaches.mehdiInstagramAria : coaches.rajaInstagramAria;
            const fbAria =
              i === 0 ? coaches.mehdiFacebookAria : coaches.rajaFacebookAria;
            const waAria =
              i === 0 ? coaches.mehdiWhatsappAria : coaches.rajaWhatsappAria;
            const waMsg =
              i === 0
                ? coaches.mehdiWhatsappMessage
                : coaches.rajaWhatsappMessage;
            const waHref = coachWhatsappHref(i === 0 ? "mehdi" : "raja", waMsg);

            return (
              <Reveal key={coach.name} delay={i * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900/40">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
                    <Image
                      src={media.image}
                      alt={coach.imageAlt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      {...(embedded || i > 0
                        ? { loading: "lazy" as const }
                        : { priority: true })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-zinc-950/80" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                      {coach.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {coach.role}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {media.instagram ? (
                        <CoachSocialIcon href={media.instagram} label={igAria}>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </CoachSocialIcon>
                      ) : null}
                      {media.facebook ? (
                        <CoachSocialIcon href={media.facebook} label={fbAria}>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </CoachSocialIcon>
                      ) : null}
                      <CoachSocialIcon
                        href={waHref}
                        label={waAria}
                        variant="whatsapp"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </CoachSocialIcon>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
    </>
  );

  if (embedded) {
    return (
      <div className="mt-14 border-t border-zinc-200 pt-14 dark:border-white/10">
        {inner}
      </div>
    );
  }

  return (
    <section
      id="coachs"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-100/80 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-900/25"
      aria-labelledby="coachs-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{inner}</div>
    </section>
  );
}

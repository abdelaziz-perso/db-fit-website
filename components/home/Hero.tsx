"use client";

import { siteConfig } from "@/lib/site/config";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/types";
import { localizedHashPath, pagePath } from "@/lib/i18n/url";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  locale: Locale;
  hero: Messages["hero"];
  waTrialHref: string;
  waJoinHref: string;
  telHref: string;
};

/**
 * Hero unique : proposition de valeur courte + CTA conversion (essai, adhésion, appel, contact).
 */
export function Hero({
  locale,
  hero,
  waTrialHref,
  waJoinHref,
  telHref,
}: Props) {
  const reduce = useReducedMotion();
  const hasVideo = Boolean(siteConfig.heroVideoUrl);

  return (
    <section
      className="relative min-h-[min(100svh,36rem)] overflow-hidden border-b border-zinc-200 sm:min-h-[85vh] dark:border-white/10"
      aria-labelledby="hero-heading"
    >
      {/*
        Sur mobile étroit, un léger « zoom arrière » (cadre élargi + object-position)
        évite que object-cover ne coupe trop le sujet ; le débord est masqué par overflow-hidden.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 max-sm:-inset-x-[12%] max-sm:-inset-y-[10%]">
          {hasVideo ? (
            <video
              className="h-full w-full object-cover object-[50%_38%] sm:object-center"
              autoPlay
              muted
              loop
              playsInline
              poster={siteConfig.heroPosterUrl}
              preload="metadata"
            >
              <source src={siteConfig.heroVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={siteConfig.heroPosterUrl}
              alt={hero.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_38%] sm:object-center"
            />
          )}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/85 to-zinc-50/40 dark:from-zinc-950 dark:via-zinc-950/75 dark:to-zinc-950/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(74,222,128,0.08),transparent)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(74,222,128,0.12),transparent)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,36rem)] max-w-6xl flex-col justify-end px-3 pb-10 pt-24 sm:min-h-[85vh] sm:px-6 sm:pb-16 sm:pt-32 md:pb-24 md:pt-40">
        <motion.p
          className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand sm:mb-4 sm:text-xs sm:tracking-[0.25em]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hero.kicker}
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="max-w-4xl text-[length:clamp(1.5rem,5.5vw+0.35rem,3.75rem)] font-black uppercase leading-[1.08] tracking-tight text-zinc-900 drop-shadow-sm dark:text-white sm:text-4xl md:leading-[1.05] md:drop-shadow-none lg:text-6xl xl:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl text-base font-medium leading-relaxed text-zinc-700 dark:text-zinc-300 sm:mt-6 sm:text-lg md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {hero.sub}
        </motion.p>
        <motion.nav
          className="mt-5 flex max-w-xl flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-brand"
          aria-label="Abonnement et salle Tamaris"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          <Link
            href={pagePath(locale, "abonnement-gym-dar-bouazza")}
            className="underline-offset-4 hover:underline"
          >
            {hero.linkAbonnement}
          </Link>
          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <Link
            href={pagePath(locale, "salle-sport-tamaris")}
            className="underline-offset-4 hover:underline"
          >
            {hero.linkFitnessTamaris}
          </Link>
        </motion.nav>
        <motion.div
          className="mt-8 flex max-w-2xl flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Link
            href={waJoinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:py-3.5"
          >
            {hero.ctaJoin}
          </Link>
          <Link
            href={waTrialHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:py-3.5"
          >
            {hero.ctaTrial}
          </Link>
          <Link
            href={telHref}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:border-brand hover:text-brand dark:border-white/40 dark:bg-zinc-950 sm:w-auto sm:px-6 sm:py-3.5"
          >
            {hero.ctaCall}
          </Link>
          <Link
            href={localizedHashPath(locale, "#horaires")}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white sm:w-auto sm:px-6 sm:py-3.5"
          >
            {hero.ctaHoraires}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

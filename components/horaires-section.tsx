"use client";

import type { LocalizedDaySchedule } from "@/lib/data/horaires";
import type { Messages } from "@/lib/i18n/types";
import Image from "next/image";
import { useState } from "react";

type Props = {
  horaires: Messages["horaires"];
  schedules: LocalizedDaySchedule[];
};

type SpaceKind = LocalizedDaySchedule["blocks"][number]["kind"];

function SpaceIcon({ kind }: { kind: SpaceKind }) {
  const women = "text-[#f472b6]";
  const men = "text-[#60a5fa]";
  if (kind === "mixed") {
    return (
      <span
        className={`flex select-none items-center gap-1 text-2xl leading-none ${women}`}
        aria-hidden
      >
        <span className={women}>♀</span>
        <span className={men}>♂</span>
      </span>
    );
  }
  if (kind === "women") {
    return (
      <span
        className={`select-none text-3xl leading-none ${women}`}
        aria-hidden
      >
        ♀
      </span>
    );
  }
  return (
    <span className={`select-none text-3xl leading-none ${men}`} aria-hidden>
      ♂
    </span>
  );
}

function SchedulePanel({ schedule }: { schedule: LocalizedDaySchedule }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {schedule.blocks.map((block) => (
        <article
          key={block.label}
          className="rounded-xl border border-zinc-200 bg-white p-5 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/60"
        >
          <div className="mb-4 flex items-center gap-3">
            <SpaceIcon kind={block.kind} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {block.label}
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {block.slots.map((slot) => (
              <li
                key={slot}
                className="rounded-lg bg-[#f5e942] px-4 py-2.5 text-center text-sm font-bold tracking-tight text-zinc-900"
              >
                {slot}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function HorairesSection({ horaires, schedules }: Props) {
  const [active, setActive] = useState<LocalizedDaySchedule["id"]>("week");

  return (
    <section
      id="horaires"
      className="relative scroll-mt-24 border-t border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="horaires-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,233,66,0.12),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-block border-2 border-[#f5e942] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f5e942]">
              {horaires.badge}
            </p>
            <h2
              id="horaires-heading"
              className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
            >
              {horaires.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {horaires.intro}
            </p>
          </div>

          <figure className="relative w-full max-w-md shrink-0 overflow-hidden rounded-xl border border-zinc-200 shadow-xl dark:border-white/10 lg:max-w-sm">
            <Image
              src="/horaires-db-fit.png"
              alt={horaires.imageAlt}
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </figure>
        </div>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label={horaires.tablistAria}
        >
          {schedules.map((s) => {
            const selected = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                id={`tab-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors sm:px-5 ${
                  selected
                    ? "bg-[#f5e942] text-zinc-900"
                    : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {schedules.map((s) => (
          <div
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            hidden={active !== s.id}
            className={active === s.id ? "block" : "hidden"}
          >
            <p className="mb-6 text-sm font-medium text-zinc-600 dark:text-zinc-500">
              {s.description}
            </p>
            <SchedulePanel schedule={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "@/components/motion/reveal";
import type { Messages } from "@/lib/i18n/types";
import { whatsappHref } from "@/lib/site/config";
import { useState, type FormEvent } from "react";

type Mode = "home" | "online" | "gym" | "other";

type Props = { bookCoach: Messages["bookCoach"]; embedded?: boolean };

function modeChoiceLabel(book: Messages["bookCoach"], mode: Mode): string {
  switch (mode) {
    case "home":
      return book.modeHome;
    case "online":
      return book.modeOnline;
    case "gym":
      return book.modeGym;
    default:
      return book.modeOther;
  }
}

function optionLabel<T extends { id: string; label: string }>(
  options: T[],
  id: string,
): string {
  return options.find((o) => o.id === id)?.label ?? id;
}

function coachBookingLine(
  options: Messages["bookCoach"]["coachOptions"],
  id: string,
): string {
  const o = options.find((c) => c.id === id);
  if (!o) return id;
  return o.subtitle ? `${o.label} — ${o.subtitle}` : o.label;
}

const selectClass =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white";

export function BookCoachSection({ bookCoach: book, embedded }: Props) {
  const [mode, setMode] = useState<Mode>("gym");
  const [durationId, setDurationId] = useState(
    () => book.durationOptions[0]?.id ?? "60",
  );
  const [coachId, setCoachId] = useState(
    () => book.coachOptions[0]?.id ?? "any",
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [detailsOptional, setDetailsOptional] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parts = [
      book.formWaPrefix.trim(),
      `${book.modeLabel}: ${modeChoiceLabel(book, mode)}`,
      `${book.durationLabel}: ${optionLabel(book.durationOptions, durationId)}`,
      `${book.coachLabel}: ${coachBookingLine(book.coachOptions, coachId)}`,
      `${book.formName}: ${name.trim()}`,
      `${book.formPhone}: ${phone.trim()}`,
    ];
    if (mode === "other") {
      parts.push(`${book.otherDetailsLabel}: ${otherDetails.trim()}`);
    } else if (detailsOptional.trim()) {
      parts.push(`${book.detailsOptionalLabel}: ${detailsOptional.trim()}`);
    }
    window.open(
      whatsappHref(parts.filter(Boolean).join(" — ")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const modes: { value: Mode }[] = [
    { value: "home" },
    { value: "online" },
    { value: "gym" },
    { value: "other" },
  ];

  const header = embedded ? null : (
    <>
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
          {book.kicker}
        </p>
        <h2
          id="book-coach-title"
          className="mt-3 text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white sm:text-3xl md:text-4xl"
        >
          {book.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
          {book.intro}
        </p>
      </Reveal>
    </>
  );

  const formBlock = (
    <Reveal delay={embedded ? 0.04 : 0.06}>
          <form
            onSubmit={onSubmit}
            aria-label={embedded ? book.title : undefined}
            className={`max-w-full rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900/50 sm:p-6 md:p-8 ${embedded ? "mt-0" : "mt-8 sm:mt-10"}`}
          >
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.modeLabel}
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {modes.map(({ value }) => {
                  const id = `book-mode-${value}`;
                  const selected = mode === value;
                  return (
                    <label
                      key={value}
                      htmlFor={id}
                      className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-colors sm:py-3.5 ${
                        selected
                          ? "border-brand bg-brand/10 text-zinc-900 dark:text-white"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:border-white/20"
                      }`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name="book-mode"
                        value={value}
                        checked={selected}
                        onChange={() => setMode(value)}
                        className="h-4 w-4 shrink-0 accent-brand"
                      />
                      <span>{modeChoiceLabel(book, value)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-zinc-500">
              {book.durationLabel}
              <select
                value={durationId}
                onChange={(e) => setDurationId(e.target.value)}
                required
                className={selectClass}
              >
                {book.durationOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="mt-6">
              <legend className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.coachLabel}
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {book.coachOptions.map((c) => {
                  const inputId = `book-coach-${c.id}`;
                  const selected = coachId === c.id;
                  return (
                    <label
                      key={c.id}
                      htmlFor={inputId}
                      className={`flex min-h-11 cursor-pointer flex-col justify-center gap-1 rounded-xl border px-4 py-3 text-sm font-bold transition-colors sm:min-h-[4.25rem] sm:py-3.5 ${
                        selected
                          ? "border-brand bg-brand/10 text-zinc-900 dark:text-white"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:border-white/20"
                      }`}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <input
                          id={inputId}
                          type="radio"
                          name="book-coach"
                          value={c.id}
                          checked={selected}
                          onChange={() => setCoachId(c.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                        />
                        <span className="min-w-0 leading-snug">
                          <span className="block text-sm font-black tracking-tight text-zinc-900 dark:text-white">
                            {c.label}
                          </span>
                          {c.subtitle ? (
                            <span className="mt-1 block text-xs font-semibold normal-case tracking-normal text-zinc-600 dark:text-zinc-400">
                              {c.subtitle}
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {mode === "other" ? (
              <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.otherDetailsLabel}
                <textarea
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                  required
                  rows={3}
                  placeholder={book.otherDetailsPlaceholder}
                  className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-normal normal-case text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
                />
              </label>
            ) : (
              <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.detailsOptionalLabel}
                <textarea
                  value={detailsOptional}
                  onChange={(e) => setDetailsOptional(e.target.value)}
                  rows={2}
                  placeholder={book.detailsOptionalPlaceholder}
                  className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-normal normal-case text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
                />
              </label>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.formName}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500">
                {book.formPhone}
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  type="tel"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-brand py-3.5 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
            >
              {book.formSubmit}
            </button>
          </form>
    </Reveal>
  );

  if (embedded) {
    return (
      <div className="mt-14 border-t border-zinc-200 pt-14 dark:border-white/10">
        <div className="mx-auto max-w-3xl">{formBlock}</div>
      </div>
    );
  }

  return (
    <section
      id="reserver-coach"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-20 md:py-28 dark:border-white/10 dark:bg-zinc-950"
      aria-labelledby="book-coach-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {header}
        {formBlock}
      </div>
    </section>
  );
}

"use client";

import { whatsappHref } from "@/lib/site/config";
import { useState } from "react";

type Props = {
  formTitle: string;
  formName: string;
  formPhone: string;
  formMessage: string;
  formSubmit: string;
  formWaPrefix: string;
};

export function ContactWhatsappForm({
  formTitle,
  formName,
  formPhone,
  formMessage,
  formSubmit,
  formWaPrefix,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parts = [formWaPrefix.trim(), name.trim(), phone.trim()];
    const extra = message.trim();
    if (extra) parts.push(extra);
    const body = parts.filter(Boolean).join(" — ");
    window.open(whatsappHref(body), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/50">
      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-white">
        {formTitle}
      </h3>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          {formName}
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="given-name"
            className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
          />
        </label>
        <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          {formPhone}
          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
          />
        </label>
        <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          {formMessage}
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-brand py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          {formSubmit}
        </button>
      </form>
    </div>
  );
}

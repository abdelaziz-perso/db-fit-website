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
  formSending: string;
  formSuccess: string;
  formError: string;
  formWaPopupBlocked: string;
};

export function ContactWhatsappForm({
  formTitle,
  formName,
  formPhone,
  formMessage,
  formSubmit,
  formWaPrefix,
  formSending,
  formSuccess,
  formError,
  formWaPopupBlocked,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function buildWhatsappUrl(): string {
    const parts = [formWaPrefix.trim(), name.trim(), phone.trim()];
    const extra = message.trim();
    if (extra) parts.push(extra);
    const body = parts.filter(Boolean).join(" — ");
    return whatsappHref(body);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const waUrl = buildWhatsappUrl();

    const host =
      typeof window !== "undefined" ? window.location.hostname : "";
    if (host === "localhost" || host === "127.0.0.1") {
      setStatus("success");
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setName("");
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      let result: { success?: boolean };
      try {
        result = (await response.json()) as { success?: boolean };
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 6000);
        return;
      }

      if (!response.ok || !result.success) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 6000);
        return;
      }

      setStatus("success");
      const win = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        alert(formWaPopupBlocked);
      }
      setName("");
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/50">
      <h3 className="text-lg font-black uppercase text-zinc-900 dark:text-white">
        {formTitle}
      </h3>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
        {status === "success" && (
          <p
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100"
            role="status"
          >
            {formSuccess}
          </p>
        )}
        {status === "error" && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-100"
            role="alert"
          >
            {formError}
          </p>
        )}
        <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          {formName}
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === "submitting"}
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
            disabled={status === "submitting"}
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
            disabled={status === "submitting"}
            maxLength={2000}
            className="mt-1 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none focus:border-brand dark:border-white/15 dark:bg-zinc-950 dark:text-white"
          />
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 rounded-full bg-brand py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? formSending : formSubmit}
        </button>
      </form>
    </div>
  );
}

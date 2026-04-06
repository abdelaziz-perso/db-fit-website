"use client";

import {
  localeLabels,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  current: Locale;
};

export function LocaleSwitcher({ current }: Props) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const tail = segments.slice(1).join("/");

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-100 p-1 dark:border-white/15 dark:bg-zinc-900/80"
      role="navigation"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const href = `/${loc}${tail ? `/${tail}` : ""}`;
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={href}
            hrefLang={loc}
            className={`inline-flex min-h-11 min-w-[2.75rem] items-center justify-center rounded-full px-3 py-2 text-xs font-bold transition-colors sm:min-w-0 sm:px-3 ${
              active
                ? "bg-[#f5e942] text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {localeLabels[loc]}
          </Link>
        );
      })}
    </div>
  );
}

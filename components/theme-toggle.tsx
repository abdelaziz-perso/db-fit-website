"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

type Props = {
  themeToLight: string;
  themeToDark: string;
};

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ themeToLight, themeToDark }: Props) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <span
        className="inline-flex h-11 w-11 shrink-0 rounded-full border border-zinc-300 bg-zinc-100 dark:border-white/15 dark:bg-zinc-900/80"
        aria-hidden
      />
    );
  }

  const active = resolvedTheme ?? theme;
  const isDark = active === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-800 transition-colors hover:border-brand hover:text-brand-fg dark:border-white/15 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:text-brand"
      aria-label={isDark ? themeToLight : themeToDark}
    >
      {isDark ? (
        <SunIcon className="h-[18px] w-[18px] text-amber-300" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px] text-zinc-700" />
      )}
    </button>
  );
}

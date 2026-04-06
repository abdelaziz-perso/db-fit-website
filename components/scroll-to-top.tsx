"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  /** Pixels scrolled before showing the control. */
  threshold?: number;
};

export function ScrollToTop({ label, threshold = 280 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className={`fixed bottom-4 right-4 z-40 flex h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] touch-manipulation items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-800 shadow-lg shadow-zinc-900/15 transition-all duration-300 ease-out motion-reduce:duration-150 hover:scale-110 hover:border-brand hover:shadow-xl hover:text-brand-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-95 dark:border-white/15 dark:bg-zinc-900/90 dark:text-zinc-200 dark:shadow-black/40 dark:hover:text-brand sm:bottom-5 sm:right-5 md:bottom-8 md:right-8 md:h-16 md:w-16 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        aria-hidden
        className="h-7 w-7 md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

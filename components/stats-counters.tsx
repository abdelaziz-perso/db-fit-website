"use client";

import { useEffect, useRef } from "react";

type Item = { end: number; suffix?: string; label: string };

type Props = {
  items: Item[];
};

export function StatsCounters({ items }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        items.forEach((item, i) => {
          const el = valueRefs.current[i];
          if (!el) return;
          const obj = { n: 0 };
          gsap.to(obj, {
            n: item.end,
            duration: 1.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.n)}${item.suffix ?? "+"}`;
            },
          });
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [items]);

  return (
    <section
      ref={rootRef}
      className="border-b border-zinc-200 bg-zinc-50 py-14 md:py-20 dark:border-white/10 dark:bg-zinc-950"
      aria-label="Stats"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:px-6">
        {items.map((item, i) => (
          <div key={item.label} className="text-center">
            <p className="font-mono text-4xl font-black text-brand md:text-5xl">
              <span
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
              >
                0{item.suffix ?? "+"}
              </span>
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

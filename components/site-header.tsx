"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/types";
import { siteConfig } from "@/lib/site/config";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  locale: Locale;
  nav: Messages["nav"];
};

/** Ancres page d’accueil (structure landing) — contact : bouton à droite. */
const NAV_LINKS = [
  { href: "#pourquoi-db-fit", key: "why" as const },
  { href: "#espaces", key: "spaces" as const },
  { href: "#activites", key: "activities" as const },
  { href: "#coaching", key: "coaching" as const },
  { href: "#tarifs", key: "pricing" as const },
  { href: "#temoignages", key: "testimonials" as const },
  { href: "#faq", key: "faq" as const },
] as const;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

const navLinkClass =
  "transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const desktopNavLinkClass = `${navLinkClass} inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-2 py-2 text-xs font-bold uppercase tracking-wide text-zinc-700 dark:text-zinc-300 xl:px-2.5`;

const homeNavButtonClass = `${navLinkClass} inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-zinc-700 dark:text-zinc-300`;

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function SiteHeader({ locale, nav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isClient = useIsClient();
  const [backdropTopPx, setBackdropTopPx] = useState(64);
  const headerRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const el = headerRef.current;
    if (!el) return;
    const sync = () =>
      setBackdropTopPx(Math.ceil(el.getBoundingClientRect().height));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.width = "100%";
    return () => {
      style.overflow = "";
      style.position = "";
      style.top = "";
      style.width = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const mobileMenuPortal =
    isClient && menuOpen
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-x-0 bottom-0 z-[100] bg-black/50 backdrop-blur-sm [-webkit-tap-highlight-color:transparent] lg:hidden"
              style={{ top: backdropTopPx }}
              aria-label={nav.closeMenu}
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="mobile-primary-nav"
              className="fixed inset-y-0 end-0 z-[110] flex w-[min(100%,20rem)] max-w-[100vw] flex-col border-s border-zinc-200 bg-zinc-50 shadow-2xl [-webkit-tap-highlight-color:transparent] dark:border-white/10 dark:bg-zinc-950 lg:hidden"
              aria-label="Primary"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-white/10">
                <span className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-white">
                  {nav.menuTitle}
                </span>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300"
                  aria-label={nav.closeMenu}
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-0 overflow-y-auto overscroll-contain p-2">
                <Link
                  href={`/${locale}`}
                  className="flex min-h-11 touch-manipulation items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-800 active:bg-zinc-200 dark:text-zinc-200 dark:active:bg-zinc-800"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand-fg dark:text-brand">
                    <HomeIcon className="h-5 w-5" />
                  </span>
                  {nav.home}
                </Link>
                {NAV_LINKS.map(({ href, key }) => (
                  <Link
                    key={key}
                    href={`/${locale}${href}`}
                    className="flex min-h-11 touch-manipulation items-center rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-800 active:bg-zinc-200 dark:text-zinc-200 dark:active:bg-zinc-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    {nav[key]}
                  </Link>
                ))}
                <Link
                  href={`/${locale}#contact`}
                  className="mx-2 mt-2 inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full border-2 border-brand px-4 text-sm font-black uppercase tracking-wide text-brand-fg dark:text-brand"
                  onClick={() => setMenuOpen(false)}
                >
                  {nav.contact}
                </Link>
              </div>
            </nav>
          </>,
          document.body,
        )
      : null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/90"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 min-[400px]:px-4 sm:gap-3 sm:px-6 lg:gap-4 lg:py-3.5">
        <Link
          href={`/${locale}`}
          className="flex min-h-11 min-w-0 shrink-0 items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          aria-label={`${siteConfig.brand} — ${nav.home}`}
        >
          <span className="inline-block max-w-full overflow-hidden rounded-full border border-zinc-200/90 shadow-sm dark:border-white/15">
            <Image
              src="/logo-db-fit.jpg"
              alt="DB FIT"
              width={160}
              height={56}
              className="h-9 w-auto max-h-11 object-cover object-center sm:h-10 md:h-11"
              priority
            />
          </span>
        </Link>

        <nav
          className="hidden min-h-11 min-w-0 flex-1 items-center justify-center gap-x-0.5 overflow-x-auto overscroll-x-contain lg:flex xl:gap-x-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          aria-label="Primary"
        >
          <Link
            href={`/${locale}`}
            className={homeNavButtonClass}
            aria-label={nav.home}
            title={nav.home}
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className={desktopNavLinkClass}
            >
              {nav[key]}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <ThemeToggle
            themeToLight={nav.themeToLight}
            themeToDark={nav.themeToDark}
          />
          <Link
            href={`/${locale}#contact`}
            className={`hidden min-h-11 items-center rounded-full border border-zinc-300 px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-800 lg:inline-flex ${navLinkClass} dark:border-white/20 dark:text-white`}
          >
            {nav.contact}
          </Link>
          <LocaleSwitcher current={locale} />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full border border-zinc-300 text-zinc-800 [transform:translateZ(0)] [-webkit-tap-highlight-color:transparent] lg:hidden dark:border-white/20 dark:text-zinc-200"
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuPortal}
    </header>
  );
}

"use client";

import { GALLERY_IMAGE_PATHS } from "@/lib/gallery-images";
import type { Messages } from "@/lib/i18n/types";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  gallery: Messages["gallery"];
};

/** Mobile : vignettes moins hautes (évite bandeau « trop long » sur téléphone). */
const slideClassName =
  "relative h-36 w-56 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-md sm:h-48 sm:w-72 sm:rounded-2xl sm:shadow-lg md:h-56 md:w-80 dark:border-white/10 dark:bg-zinc-900";

const lightboxToolbarBtnClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-white/30 bg-zinc-900/80 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Bandeau photos WebP — défilement horizontal CSS ; clic → aperçu plein écran (rotation ±90°).
 */
export function Gallery({ gallery }: Props) {
  const [lightbox, setLightbox] = useState<{
    src: string;
    index: number;
  } | null>(null);
  const [rotation, setRotation] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setLightbox(null);
    setRotation(0);
  }, []);

  const open = useCallback((src: string, index: number) => {
    setRotation(0);
    setLightbox({ src, index });
  }, []);

  const rotateBy = useCallback((delta: number) => {
    setRotation((r) => (r + delta + 360) % 360);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close]);

  useEffect(() => {
    if (lightbox) closeBtnRef.current?.focus();
  }, [lightbox]);

  const sideways = rotation % 180 !== 0;

  const renderThumb = (
    src: string,
    index: number,
    opts: { duplicate: boolean },
  ): ReactNode => {
    const decorative = opts.duplicate;
    return (
      <button
        key={decorative ? `${src}-dup` : src}
        type="button"
        onClick={() => open(src, index)}
        className={`${slideClassName} cursor-pointer border-0 p-0 transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}
        tabIndex={decorative ? -1 : 0}
      >
        <Image
          src={src}
          alt={
            decorative
              ? ""
              : `${gallery.imageAlt} ${index + 1}`
          }
          fill
          className="object-cover"
          sizes="(max-width: 640px) 60vw, 320px"
          loading="lazy"
          decoding="async"
        />
      </button>
    );
  };

  const lightboxNode =
    lightbox &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
        role="dialog"
        aria-modal="true"
        aria-label={gallery.title}
        onClick={close}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          className={`${lightboxToolbarBtnClass} absolute right-4 top-4 z-10`}
          aria-label={gallery.closeLightbox}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div
          className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:bottom-8"
          role="group"
          aria-label={`${gallery.rotateLeft} · ${gallery.rotateRight}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rotateBy(-90);
            }}
            className={lightboxToolbarBtnClass}
            aria-label={gallery.rotateLeft}
          >
            <RotateCcwIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rotateBy(90);
            }}
            className={lightboxToolbarBtnClass}
            aria-label={gallery.rotateRight}
          >
            <RotateCwIcon className="h-6 w-6" />
          </button>
        </div>

        <div
          className="flex max-h-[85dvh] max-w-[min(100vw-1rem,1200px)] items-center justify-center overflow-auto px-2 pb-20 pt-14 sm:max-h-[92vh] sm:pb-24"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{ transform: `rotate(${rotation}deg)` }}
            className="origin-center transition-transform duration-300 ease-out will-change-transform"
          >
            <Image
              src={lightbox.src}
              alt={`${gallery.imageAlt} ${lightbox.index + 1}${rotation ? `, ${rotation}°` : ""}`}
              width={2400}
              height={1600}
              className={
                sideways
                  ? "max-h-[min(88vw,85dvh)] max-w-[min(88dvh,96vw)] object-contain sm:max-h-[min(90vw,88vh)] sm:max-w-[min(90vh,96vw)]"
                  : "max-h-[min(72dvh,92vw)] w-auto max-w-full object-contain sm:max-h-[88vh]"
              }
              sizes="95vw"
              priority
            />
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <section
      id="galerie"
      className="scroll-mt-24 border-t border-zinc-200 bg-zinc-100 py-16 md:py-24 dark:border-white/10 dark:bg-zinc-900"
      aria-labelledby="galerie-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          {gallery.kicker}
        </p>
        <h2
          id="galerie-heading"
          className="max-w-2xl text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-4xl"
        >
          {gallery.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {gallery.intro}
        </p>
      </div>

      <div
        className="gallery-marquee mt-10 w-full overflow-hidden py-1"
        dir="ltr"
        role="region"
        aria-label={gallery.title}
      >
        <div className="gallery-marquee-track gap-4 pr-4">
          <div className="flex gap-4">
            {GALLERY_IMAGE_PATHS.map((src, i) =>
              renderThumb(src, i, { duplicate: false }),
            )}
          </div>
          <div className="flex gap-4" aria-hidden>
            {GALLERY_IMAGE_PATHS.map((src, i) =>
              renderThumb(src, i, { duplicate: true }),
            )}
          </div>
        </div>
      </div>

      {lightboxNode}
    </section>
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

function RotateCcwIcon({ className }: { className?: string }) {
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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function RotateCwIcon({ className }: { className?: string }) {
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
      <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

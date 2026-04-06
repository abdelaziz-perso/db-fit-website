import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Icône section — distinction visuelle du kicker */
export function IconSparkleBadge({ className, ...p }: IconProps) {
  return (
    <svg {...stroke} className={className} {...p}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.265 1.265L3 12l5.835 1.935a2 2 0 0 1 1.265 1.265L12 21l1.935-5.8a2 2 0 0 1 1.265-1.265L21 12l-5.8-1.935a2 2 0 0 1-1.265-1.265L12 3Z" />
    </svg>
  );
}

/** Carte 0 — équipement / qualité */
export function IconDumbbell({ className, ...p }: IconProps) {
  return (
    <svg {...stroke} className={className} {...p}>
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 2.404a2 2 0 1 1 2.828 2.829l-1.768 1.767a2 2 0 1 1-2.829 2.829L2.272 3.435a2 2 0 1 1 2.829-2.829l1.767 1.768z" />
    </svg>
  );
}

/** Carte 1 — coachs / accompagnement */
export function IconUsersRound({ className, ...p }: IconProps) {
  return (
    <svg {...stroke} className={className} {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/** Carte 2 — 7j/7 */
export function IconClock({ className, ...p }: IconProps) {
  return (
    <svg {...stroke} className={className} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

/** Carte 3 — accès / zone */
export function IconMapPin({ className, ...p }: IconProps) {
  return (
    <svg {...stroke} className={className} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Ordre aligné sur `features.items` (FR/EN/AR : équipement, coachs, horaires, localisation). */
export const FEATURE_CARD_ICONS = [
  IconDumbbell,
  IconUsersRound,
  IconClock,
  IconMapPin,
] as const;

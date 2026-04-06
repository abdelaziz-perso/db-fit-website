import type { MoneyRelatedLink } from "@/lib/i18n/types-silo";

/** Default internal silo links (FR labels) — pages omit self where needed in each page file */
export const siloRelatedFrCore: MoneyRelatedLink[] = [
  { slug: "gym-dar-bouazza", label: "Gym à Dar Bouazza" },
  { slug: "salle-de-sport-dar-bouazza", label: "Salle de sport Dar Bouazza" },
  { slug: "salle-femmes-dar-bouazza", label: "Salle femmes" },
  { slug: "salle-hommes-dar-bouazza", label: "Salle hommes" },
  { slug: "fitness-mixte-dar-bouazza", label: "Fitness mixte" },
  { slug: "coaching-sportif-dar-bouazza", label: "Coaching sportif" },
  { slug: "abonnement-gym-dar-bouazza", label: "Abonnement & tarifs" },
  { slug: "fitness-dar-bouazza", label: "Fitness Dar Bouazza" },
  { slug: "salle-sport-tamaris", label: "Salle de sport Tamaris" },
  { slug: "gym-casablanca-ouest", label: "Gym Casablanca ouest" },
];

export function siloRelatedFrExcluding(
  excludeSlug: string,
): MoneyRelatedLink[] {
  return siloRelatedFrCore.filter((l) => l.slug !== excludeSlug);
}

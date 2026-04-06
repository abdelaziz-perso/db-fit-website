import type { MoneyRelatedLink } from "@/lib/i18n/types-silo";

export const siloRelatedEnCore: MoneyRelatedLink[] = [
  { slug: "gym-dar-bouazza", label: "Gym in Dar Bouazza" },
  { slug: "salle-de-sport-dar-bouazza", label: "Gym / sports club Dar Bouazza" },
  { slug: "salle-femmes-dar-bouazza", label: "Women’s area" },
  { slug: "salle-hommes-dar-bouazza", label: "Men’s area" },
  { slug: "fitness-mixte-dar-bouazza", label: "Mixed training" },
  { slug: "coaching-sportif-dar-bouazza", label: "Personal coaching" },
  { slug: "abonnement-gym-dar-bouazza", label: "Membership & pricing" },
  { slug: "fitness-dar-bouazza", label: "Fitness Dar Bouazza" },
  { slug: "salle-sport-tamaris", label: "Gym near Tamaris" },
  { slug: "gym-casablanca-ouest", label: "West Casablanca gym" },
];

export function siloRelatedEnExcluding(
  excludeSlug: string,
): MoneyRelatedLink[] {
  return siloRelatedEnCore.filter((l) => l.slug !== excludeSlug);
}

import type { MoneyRelatedLink } from "@/lib/i18n/types-silo";

export const siloRelatedArCore: MoneyRelatedLink[] = [
  { slug: "gym-dar-bouazza", label: "جيم دار بوعزة" },
  { slug: "salle-de-sport-dar-bouazza", label: "صالة رياضية دار بوعزة" },
  { slug: "salle-femmes-dar-bouazza", label: "قسم النساء" },
  { slug: "salle-hommes-dar-bouazza", label: "قسم الرجال" },
  { slug: "fitness-mixte-dar-bouazza", label: "لياقة مختلطة" },
  { slug: "coaching-sportif-dar-bouazza", label: "تدريب رياضي" },
  { slug: "abonnement-gym-dar-bouazza", label: "اشتراك وأسعار" },
  { slug: "fitness-dar-bouazza", label: "لياقة دار بوعزة" },
  { slug: "salle-sport-tamaris", label: "صالة قرب تماريس" },
  { slug: "gym-casablanca-ouest", label: "جيم غرب كازابلانكا" },
];

export function siloRelatedArExcluding(
  excludeSlug: string,
): MoneyRelatedLink[] {
  return siloRelatedArCore.filter((l) => l.slug !== excludeSlug);
}

import type { Locale } from "@/lib/i18n/config";

/** Clusters : Dar Bouazza · Tamaris · Ansari (intention locale + transactionnelle). */
const FR = [
  "gym dar bouazza",
  "salle de sport dar bouazza",
  "fitness dar bouazza",
  "fitness dar bouazza tamaris",
  "gym tamaris casablanca",
  "fitness ansari dar bouazza",
  "salle de sport ansari",
  "gym ansari dar bouazza",
  "abonnement gym dar bouazza",
  "coaching sportif dar bouazza",
  "musculation dar bouazza",
  "cardio dar bouazza",
  "salle de sport femmes dar bouazza",
  "salle de sport hommes dar bouazza",
  "fitness mixte dar bouazza",
  "Dar Bouazza",
  "Tamaris",
  "Ansari",
  "DB FIT",
];

const EN = [
  "gym dar bouazza",
  "fitness dar bouazza",
  "gym tamaris casablanca",
  "fitness ansari dar bouazza",
  "gym near tamaris",
  "sports club dar bouazza",
  "gym membership dar bouazza",
  "strength training dar bouazza",
  "coaching dar bouazza",
  "Dar Bouazza",
  "Tamaris",
  "Ansari",
  "DB FIT",
];

const AR = [
  "جيم دار بوعزة",
  "صالة رياضية دار بوعزة",
  "لياقة بدنية دار بوعزة",
  "لياقة دار بوعزة تماريس",
  "جيم تماريس كازابلانكا",
  "رياضة أنصاري دار بوعزة",
  "اشتراك جيم دار بوعزة",
  "دار بوعزة",
  "تماريس",
  "أنصاري",
  "DB FIT",
];

export function keywordsForLocale(locale: Locale): string[] {
  if (locale === "fr") return FR;
  if (locale === "en") return EN;
  return AR;
}

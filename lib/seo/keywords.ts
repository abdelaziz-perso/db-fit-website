import type { Locale } from "@/lib/i18n/config";

const FR = [
  "gym dar bouazza",
  "salle de sport dar bouazza",
  "fitness casablanca",
  "fitness dar bouazza",
  "gym casablanca dar bouazza",
  "salle de sport casablanca dar bouazza",
  "gym ansari dar bouazza",
  "salle de sport ansari",
  "fitness dar bouazza casablanca",
  "gym proche de moi dar bouazza",
  "salle de sport près de moi casablanca",
  "coaching sportif dar bouazza",
  "programme musculation dar bouazza",
  "salle de sport femmes dar bouazza",
  "salle de sport mixte casablanca",
  "salle de sport hommes dar bouazza",
  "fitness coaching casablanca",
  "abonnement gym dar bouazza",
  "prix salle de sport dar bouazza",
  "inscription gym casablanca",
  "offre fitness dar bouazza",
  "meilleur gym casablanca",
  "fitness premium casablanca",
  "salle de sport moderne casablanca",
  "gym haut de gamme dar bouazza",
  "best gym dar bouazza",
  "meilleur gym dar bouazza",
  "DB FIT",
  "Ansari",
  "Tamaris",
];

const EN = [
  "gym dar bouazza",
  "fitness club casablanca",
  "best gym in dar bouazza",
  "personal trainer casablanca",
  "workout gym dar bouazza",
  "gym casablanca",
  "mixed gym casablanca",
  "women gym dar bouazza",
  "sports coaching dar bouazza",
  "gym membership dar bouazza",
  "DB FIT",
  "Ansari",
  "Tamaris",
];

const AR = [
  "جيم دار بوعزة",
  "صالة رياضية دار بوعزة",
  "لياقة دار بوعزة",
  "كازابلانكا",
  "أنصاري",
  "تماريس",
  "تدريب رياضي",
  "DB FIT",
];

export function keywordsForLocale(locale: Locale): string[] {
  if (locale === "fr") return FR;
  if (locale === "en") return EN;
  return AR;
}

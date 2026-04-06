import type { SiloPages } from "@/lib/i18n/types-silo";

export const SILO_SLUGS = [
  "gym-dar-bouazza",
  "salle-de-sport-dar-bouazza",
  "fitness-dar-bouazza",
  "coaching-sportif-dar-bouazza",
  "salle-femmes-dar-bouazza",
  "fitness-mixte-dar-bouazza",
  "salle-hommes-dar-bouazza",
  "abonnement-gym-dar-bouazza",
  "programme-musculation-debutant",
  "perdre-poids-rapidement",
  "exercices-salle-de-sport",
  "salle-sport-tamaris",
  "gym-casablanca-ouest",
] as const;

export type SiloSlug = (typeof SILO_SLUGS)[number];

export const SLUG_TO_PAGE_KEY: Record<SiloSlug, keyof SiloPages> = {
  "gym-dar-bouazza": "gymDarBouazza",
  "salle-de-sport-dar-bouazza": "salleDeSportDarBouazza",
  "fitness-dar-bouazza": "fitnessDarBouazza",
  "coaching-sportif-dar-bouazza": "coachingSportifDarBouazza",
  "salle-femmes-dar-bouazza": "salleFemmesDarBouazza",
  "fitness-mixte-dar-bouazza": "fitnessMixteDarBouazza",
  "salle-hommes-dar-bouazza": "salleHommesDarBouazza",
  "abonnement-gym-dar-bouazza": "abonnementGymDarBouazza",
  "programme-musculation-debutant": "programmeMusculationDebutant",
  "perdre-poids-rapidement": "perdrePoidsRapidement",
  "exercices-salle-de-sport": "exercicesSalleDeSport",
  "salle-sport-tamaris": "salleSportTamaris",
  "gym-casablanca-ouest": "gymCasablancaOuest",
};

export const PAGE_KEY_TO_SLUG: Record<keyof SiloPages, SiloSlug> = {
  gymDarBouazza: "gym-dar-bouazza",
  salleDeSportDarBouazza: "salle-de-sport-dar-bouazza",
  fitnessDarBouazza: "fitness-dar-bouazza",
  coachingSportifDarBouazza: "coaching-sportif-dar-bouazza",
  salleFemmesDarBouazza: "salle-femmes-dar-bouazza",
  fitnessMixteDarBouazza: "fitness-mixte-dar-bouazza",
  salleHommesDarBouazza: "salle-hommes-dar-bouazza",
  abonnementGymDarBouazza: "abonnement-gym-dar-bouazza",
  programmeMusculationDebutant: "programme-musculation-debutant",
  perdrePoidsRapidement: "perdre-poids-rapidement",
  exercicesSalleDeSport: "exercices-salle-de-sport",
  salleSportTamaris: "salle-sport-tamaris",
  gymCasablancaOuest: "gym-casablanca-ouest",
};

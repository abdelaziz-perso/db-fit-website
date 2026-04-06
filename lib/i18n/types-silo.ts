export type MoneySubsection = {
  h3: string;
  paragraphs: string[];
};

export type MoneySection = {
  h2: string;
  paragraphs: string[];
  subsections?: MoneySubsection[];
};

export type MoneyFaqItem = {
  question: string;
  answer: string;
};

export type MoneyRelatedLink = {
  slug: string;
  label: string;
};

/** Full SEO silo / money page (1000+ words capable) */
export type MoneyPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string[];
  sections: MoneySection[];
  faqSectionTitle: string;
  faq: MoneyFaqItem[];
  cta: string;
  waMessage: string;
  relatedSectionTitle: string;
  relatedLinks: MoneyRelatedLink[];
};

export type SiloPages = {
  gymDarBouazza: MoneyPageContent;
  salleDeSportDarBouazza: MoneyPageContent;
  fitnessDarBouazza: MoneyPageContent;
  coachingSportifDarBouazza: MoneyPageContent;
  salleFemmesDarBouazza: MoneyPageContent;
  fitnessMixteDarBouazza: MoneyPageContent;
  salleHommesDarBouazza: MoneyPageContent;
  abonnementGymDarBouazza: MoneyPageContent;
  programmeMusculationDebutant: MoneyPageContent;
  perdrePoidsRapidement: MoneyPageContent;
  exercicesSalleDeSport: MoneyPageContent;
  salleSportTamaris: MoneyPageContent;
  gymCasablancaOuest: MoneyPageContent;
};

import type { Locale } from "./config";
import type { SiloPages } from "./types-silo";

export type PricingCard = {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Messages = {
  meta: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  nav: {
    /** Lien accueil (icône maison). */
    home: string;
    /** Ancre #pourquoi-db-fit */
    why: string;
    spaces: string;
    activities: string;
    /** Ancre #coaching (équipe + réservation). */
    coaching: string;
    pricing: string;
    testimonials: string;
    /** Libellé lien FAQ (#faq). */
    faq: string;
    contact: string;
    themeToLight: string;
    themeToDark: string;
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
    /** Bouton flottant retour en haut de page. */
    backToTop: string;
  };
  /** Bloc « Pourquoi DB FIT » — contenu unique (pas de répétition hero). */
  features: {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
  };
  /** FAQ page d’accueil (SEO local + JSON-LD FAQPage). */
  faq: {
    kicker: string;
    heading: string;
    items: { question: string; answer: string }[];
  };
  /** En-tête de la section coaching fusionnée (coachs + formulaire). */
  coachingLead: {
    kicker: string;
    title: string;
    intro: string;
    quickWaLabel: string;
    quickWaMessage: string;
  };
  hero: {
    kicker: string;
    headline: string;
    sub: string;
    /** Texte alternatif image / poster hero (SEO & accessibilité). */
    heroImageAlt: string;
    ctaJoin: string;
    ctaTrial: string;
    ctaWhatsapp: string;
    /** Lien tel: (ex. Appeler / Call). */
    ctaCall: string;
    ctaHoraires: string;
    trialWaMessage: string;
    joinWaMessage: string;
  };
  stats: {
    members: string;
    machines: string;
    results: string;
  };
  spaces: {
    kicker: string;
    title: string;
    womenTitle: string;
    womenDesc: string;
    mixedTitle: string;
    mixedDesc: string;
    menTitle: string;
    menDesc: string;
    womenAlt: string;
    mixedAlt: string;
    menAlt: string;
  };
  activities: {
    kicker: string;
    title: string;
    strength: string;
    cardio: string;
    cross: string;
    coaching: string;
    strengthAlt: string;
    cardioAlt: string;
    crossAlt: string;
    coachingAlt: string;
  };
  experience: {
    kicker: string;
    title: string;
    equipment: string;
    coaches: string;
    atmosphere: string;
    community: string;
  };
  coachesSection: {
    kicker: string;
    title: string;
    mehdiInstagramAria: string;
    mehdiFacebookAria: string;
    mehdiWhatsappAria: string;
    rajaInstagramAria: string;
    rajaFacebookAria: string;
    rajaWhatsappAria: string;
    mehdiWhatsappMessage: string;
    rajaWhatsappMessage: string;
    items: {
      name: string;
      role: string;
      imageAlt: string;
    }[];
  };
  bookCoach: {
    kicker: string;
    title: string;
    intro: string;
    modeLabel: string;
    modeHome: string;
    modeOnline: string;
    modeGym: string;
    modeOther: string;
    durationLabel: string;
    durationOptions: { id: string; label: string }[];
    coachLabel: string;
    coachOptions: { id: string; label: string; subtitle?: string }[];
    detailsOptionalLabel: string;
    detailsOptionalPlaceholder: string;
    otherDetailsLabel: string;
    otherDetailsPlaceholder: string;
    formName: string;
    formPhone: string;
    formSubmit: string;
    formWaPrefix: string;
  };
  pricing: {
    kicker: string;
    title: string;
    promo: string;
    popularBadge: string;
    cards: PricingCard[];
    footnote: string;
    cta: string;
    waMessage: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    items: Testimonial[];
  };
  finalCta: {
    title: string;
    urgency: string;
    startToday: string;
    /** Bouton appel téléphonique (à côté du CTA WhatsApp). */
    ctaCall: string;
    waMessage: string;
  };
  contact: {
    kicker: string;
    title: string;
    addressLabel: string;
    hoursLabel: string;
    hoursValue: string;
    phoneLabel: string;
    waLabel: string;
    mapTitle: string;
    formTitle: string;
    formName: string;
    formPhone: string;
    formSubmit: string;
    formWaPrefix: string;
    formMessage: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    formWaPopupBlocked: string;
  };
  footer: {
    line: string;
    rights: string;
    createdByPrefix: string;
    backHome: string;
    seoGym: string;
    seoFitness: string;
    seoCoaching: string;
    seoSalleFemmes: string;
    seoFitnessMixte: string;
    seoSalleSport: string;
    seoAbonnement: string;
    seoProgrammeDebutant: string;
  };
  horaires: {
    badge: string;
    heading: string;
    intro: string;
    imageAlt: string;
    tablistAria: string;
    weekTab: string;
    sundayTab: string;
    weekDescription: string;
    sundayDescription: string;
    spaceWomen: string;
    spaceMen: string;
    spaceMixed: string;
  };
  siloPages: SiloPages;
};

export type { Locale };

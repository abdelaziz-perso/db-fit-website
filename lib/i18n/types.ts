import type { Locale } from "./config";
import type { SiloPages } from "./types-silo";

export type PricingCard = {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
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
    /** Ancre #galerie */
    gallery: string;
    pricing: string;
    /** Ancre #horaires (créneaux femmes / hommes / mixte). */
    horaires: string;
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
  /** En-tête de la section coaching (coachs + CTA WhatsApp). */
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
    /** Liens maillage interne (pilier abonnement + Tamaris). */
    linkAbonnement: string;
    linkFitnessTamaris: string;
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
  /** Carrousel photos salle (fichiers `public/db-photos/*.webp`). */
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    /** Préfixe texte alternatif (numéro ajouté côté UI). */
    imageAlt: string;
    /** Bouton fermer l’agrandissement plein écran. */
    closeLightbox: string;
    /** Pivoter l’image dans la lightbox (sens antihoraire / horaire). */
    rotateLeft: string;
    rotateRight: string;
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
    /** Lien sous la carte (ouvre Google Maps dans un nouvel onglet). */
    mapOpenGoogleLabel: string;
    /** Ligne NAP renforcée (Dar Bouazza · Tamaris · Ansari). */
    napLine: string;
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
    seoTamaris: string;
    seoAbonnement: string;
    seoProgrammeDebutant: string;
  };
  horaires: {
    badge: string;
    heading: string;
    intro: string;
    tablistAria: string;
    weekTab: string;
    sundayTab: string;
    weekDescription: string;
    sundayDescription: string;
    spaceWomen: string;
    spaceMen: string;
    spaceMixed: string;
    /** Créneaux lun–sam : femmes, mixte, hommes (ordre d’affichage). */
    weekSlots: {
      women: string[];
      mixed: string[];
      men: string[];
    };
    /** Créneaux dimanche : hommes, femmes (ordre d’affichage). */
    sundaySlots: {
      men: string[];
      women: string[];
    };
  };
  siloPages: SiloPages;
};

export type { Locale };

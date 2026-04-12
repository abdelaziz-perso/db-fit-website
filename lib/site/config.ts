function stripNonDigits(s: string): string {
  return s.replace(/\D/g, "");
}

const rawWa = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "212721036332";
const rawPhone = process.env.NEXT_PUBLIC_PHONE_E164 ?? rawWa;
const mainWaE164 = stripNonDigits(rawWa);
const mehdiWaRaw = process.env.NEXT_PUBLIC_MEHDI_WHATSAPP_E164?.trim();
const rajaWaRaw = process.env.NEXT_PUBLIC_RAJA_WHATSAPP_E164?.trim();

const defaultInstagram =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/";
const defaultFacebook =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/";

/**
 * Meta tag `content` from Search Console (optional — you already have the HTML file in `public/`).
 * Example: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc...xyz`
 */
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "";

const geoCoords = {
  latitude: 33.38,
  longitude: -7.82,
} as const;

/**
 * Carte intégrée — même établissement que le lien « Ouvrir dans Google Maps » (cid fiche DB FIT).
 * Surcharge : `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`
 */
const defaultGoogleMapsEmbedUrl =
  "https://www.google.com/maps?cid=5427274451632439104&hl=fr&gl=MA&output=embed";

export const siteConfig = {
  brand: "DB FIT",
  /** Used for JSON-LD & canonicals when set (évite un domaine d’un autre projet si l’env manque). */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://fitnessdarbouazza.ma",
  /** Google Search Console (meta tag method); empty if using HTML file only */
  googleSiteVerification: googleVerification,
  whatsappE164: mainWaE164,
  phoneE164: stripNonDigits(rawPhone),
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+212 721 036 332",
  /** Pre-filled text for the floating WhatsApp button */
  stickyWhatsappMessage:
    process.env.NEXT_PUBLIC_WA_STICKY_MESSAGE ?? "slt db fit",
  /**
   * MP4 en boucle pour le hero. Non défini → `/hero-background.mp4` (diaporama).
   * Chaîne vide → pas de vidéo (image poster seule).
   */
  heroVideoUrl:
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL !== undefined
      ? process.env.NEXT_PUBLIC_HERO_VIDEO_URL.trim()
      : "/hero-background.mp4",
  /** Poster for hero / LCP candidate when no video */
  heroPosterUrl:
    process.env.NEXT_PUBLIC_HERO_POSTER_URL?.trim() ||
    "/db-photos/image00028.webp",
  address: {
    streetAddress: "Ansari, Dar Bouazza",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    postalCode: "",
    addressCountry: "MA",
  },
  geo: geoCoords,
  /** Bloc carte (iframe Google + lien) sur la page contact. */
  contactMapEnabled: true,
  googleMapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() ||
    defaultGoogleMapsEmbedUrl,
  /**
   * Lien « Ouvrir dans Google Maps » (fiche lieu officielle, pas une recherche texte).
   * Surcharge : `NEXT_PUBLIC_GOOGLE_MAPS_URL`
   */
  googleMapsOpenUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL?.trim() ||
    "https://maps.app.goo.gl/Y8pgQkXZWvdnC6kWA",
  instagramUrl: defaultInstagram,
  facebookUrl: defaultFacebook,
  /** Réseaux Mehdi — si vides, même page que le club (icônes toujours visibles). */
  mehdiInstagramUrl:
    process.env.NEXT_PUBLIC_MEHDI_INSTAGRAM_URL?.trim() || defaultInstagram,
  mehdiFacebookUrl:
    process.env.NEXT_PUBLIC_MEHDI_FACEBOOK_URL?.trim() || defaultFacebook,
  /** wa.me pour fiches coach — par défaut numéro club ; surcharger par coach si besoin. */
  mehdiWhatsappE164: mehdiWaRaw ? stripNonDigits(mehdiWaRaw) : mainWaE164,
  rajaWhatsappE164: rajaWaRaw ? stripNonDigits(rajaWaRaw) : mainWaE164,
  openingHoursNote: "7/7",
} as const;

/** Crédit site (footer). */
export const siteCredits = {
  developerName: "Abdelaziz Elhathout",
  developerUrl: "https://abdelazizelhathout.com/",
} as const;

function waMeUrl(e164: string, message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${stripNonDigits(e164)}?text=${text}`;
}

export function whatsappHref(message: string): string {
  return waMeUrl(siteConfig.whatsappE164, message);
}

/** Liens wa.me depuis les cartes coach (numéro dédié possible via env). */
export function coachWhatsappHref(
  coach: "mehdi" | "raja",
  message: string,
): string {
  const e164 =
    coach === "mehdi"
      ? siteConfig.mehdiWhatsappE164
      : siteConfig.rajaWhatsappE164;
  return waMeUrl(e164, message);
}

export function telHref(): string {
  return `tel:+${siteConfig.phoneE164}`;
}

export function stickyWhatsappHref(): string {
  return whatsappHref(siteConfig.stickyWhatsappMessage);
}

/** Floating FAB: opens chat without pre-filled text (wa.me/{e164}). */
export function whatsappDirectHref(): string {
  return `https://wa.me/${siteConfig.whatsappE164}`;
}

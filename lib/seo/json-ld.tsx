import type { Locale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { pagePath } from "@/lib/i18n/url";
import { siteConfig } from "@/lib/site/config";

type Props = { locale: string };

const baseUrl = () => siteConfig.siteUrl.replace(/\/$/, "");

function descriptions(locale: string): { business: string; org: string } {
  if (locale === "fr") {
    return {
      business:
        "Salle de sport Dar Bouazza — DB FIT à Ansari, proche Tamaris : musculation, cardio, coaching sur place. Ouvert 7j/7.",
      org: "Salle de sport Dar Bouazza (Ansari) — DB FIT, club de fitness et coaching, Grand Casablanca.",
    };
  }
  if (locale === "ar") {
    return {
      business:
        "صالة رياضية دار بوعزة — DB FIT في أنصاري، قرب تماريس: حديد، كارديو، تدريب. مفتوح كل يوم.",
      org: "صالة رياضية دار بوعزة (أنصاري) — DB FIT، نادي لياقة وتدريب.",
    };
  }
  return {
    business:
      "Sports club in Dar Bouazza — DB FIT at Ansari, near Tamaris: strength, cardio, on-site coaching. Open 7 days.",
    org: "Dar Bouazza sports club (Ansari) — DB FIT, fitness and coaching, Morocco.",
  };
}

/**
 * JSON-LD @graph (schema.org) — aligné sur le modèle :
 * Organization (#organization) → WebSite (#website) → LocalBusiness (#business).
 * Les URLs absolues viennent de `NEXT_PUBLIC_SITE_URL` (siteConfig.siteUrl).
 */
export function SiteGraphJsonLd({ locale }: Props) {
  const base = baseUrl();
  const orgId = `${base}/#organization`;
  const webId = `${base}/#website`;
  const bizId = `${base}/#business`;
  const loc = locale as Locale;
  const pageUrl = `${base}${pagePath(loc, "")}`;
  const { business, org } = descriptions(locale);

  const postal = siteConfig.address.postalCode || undefined;

  const postalAddress = {
    "@type": "PostalAddress" as const,
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    ...(postal ? { postalCode: postal } : {}),
    addressCountry: siteConfig.address.addressCountry,
  };

  const sameAs = [siteConfig.instagramUrl, siteConfig.facebookUrl];
  const logoUrl = `${base}/logo-db-fit.jpg`;
  const mapsUrl = siteConfig.googleMapsOpenUrl;
  const heroImageAbs = siteConfig.heroPosterUrl.startsWith("http")
    ? siteConfig.heroPosterUrl
    : absoluteUrl(siteConfig.heroPosterUrl);

  const organization = {
    "@type": "Organization" as const,
    "@id": orgId,
    name: siteConfig.brand,
    url: pageUrl,
    logo: logoUrl,
    sameAs,
    description: org,
    image: heroImageAbs,
    address: { ...postalAddress },
  };

  const website = {
    "@type": "WebSite" as const,
    "@id": webId,
    url: base,
    name: siteConfig.brand,
    publisher: { "@id": orgId },
    about: { "@id": bizId },
    inLanguage: ["fr-MA", "en", "ar-MA"],
  };

  const publicBusinessName =
    loc === "fr"
      ? "Salle de sport Dar Bouazza — DB FIT (Tamaris · Ansari)"
      : loc === "ar"
        ? "DB FIT — صالة رياضية دار بوعزة · تماريس"
        : "DB FIT — Sports club Dar Bouazza (Tamaris · Ansari)";

  const localBusiness = {
    "@type": ["Gym", "LocalBusiness", "SportsActivityLocation", "HealthClub"] as const,
    "@id": bizId,
    name: publicBusinessName,
    alternateName:
      loc === "fr"
        ? [
            siteConfig.brand,
            "Salle de sport Dar Bouazza",
            "DB FIT Dar Bouazza",
            "DB FIT Tamaris",
            "DB FIT Ansari",
          ]
        : [
            siteConfig.brand,
            "DB FIT Dar Bouazza",
            "DB FIT Tamaris",
            "DB FIT Ansari",
          ],
    parentOrganization: { "@id": orgId },
    address: { ...postalAddress },
    hasMap: mapsUrl,
    description: business,
    url: pageUrl,
    telephone: `+${siteConfig.phoneE164}`,
    openingHours: "Mo-Su",
    image: heroImageAbs,
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "Place" as const, name: "Dar Bouazza" },
      { "@type": "Place" as const, name: "Tamaris" },
      { "@type": "Place" as const, name: "Ansari" },
    ],
    sameAs,
    priceRange: "$$",
    keywords:
      loc === "fr"
        ? "Salle de sport Dar Bouazza, gym dar bouazza, salle de sport dar bouazza, fitness tamaris, coaching dar bouazza, Ansari"
        : loc === "ar"
          ? "صالة رياضية دار بوعزة, جيم دار بوعزة, تماريس, أنصاري, تدريب, لياقة"
          : "Dar Bouazza sports club, gym dar bouazza, fitness tamaris, coaching dar bouazza, Ansari",
    amenityFeature: [
      "Musculation",
      "Cardio",
      "Coaching sportif",
      "Espace femmes",
      "Espace hommes",
      "Espace mixte",
    ],
    knowsAbout:
      loc === "fr"
        ? [
            "Salle de sport Dar Bouazza",
            "Fitness",
            "Musculation",
            "Cardio training",
            "Coaching personnel",
          ]
        : loc === "ar"
          ? [
              "صالة رياضية دار بوعزة",
              "لياقة بدنية",
              "حديد وبناء الأجسام",
              "كارديو",
              "تدريب شخصي",
            ]
          : [
              "Dar Bouazza sports club",
              "Fitness",
              "Strength training",
              "Cardio",
              "Personal coaching",
            ],
  };

  const payload = {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

/** @deprecated Utiliser `SiteGraphJsonLd` — conservé pour imports existants. */
export const LocalBusinessJsonLd = SiteGraphJsonLd;

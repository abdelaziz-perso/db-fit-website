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
        "DB FIT — salle de sport et gym à Dar Bouazza (Ansari), proche Tamaris : musculation, cardio, coaching sur place. Ouvert 7j/7.",
      org: "DB FIT — salle de sport, club de fitness et centre de coaching à Ansari, Dar Bouazza (Grand Casablanca).",
    };
  }
  if (locale === "ar") {
    return {
      business:
        "DB FIT — صالة رياضية في دار بوعزة (أنصاري) قرب تماريس: حديد، كارديو، تدريب. مفتوح كل يوم.",
      org: "DB FIT — منشأة رياضية ونادي لياقة في أنصاري، دار بوعزة.",
    };
  }
  return {
    business:
      "DB FIT — gym & fitness in Dar Bouazza (Ansari), near Tamaris: strength, cardio, on-site coaching. Open 7 days.",
    org: "DB FIT — fitness club and coaching gym in Ansari, Dar Bouazza, Morocco.",
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
      ? "DB FIT – Salle de sport Dar Bouazza Tamaris"
      : loc === "ar"
        ? "DB FIT — صالة رياضية دار بوعزة · تماريس"
        : "DB FIT — Gym Dar Bouazza & Tamaris";

  const localBusiness = {
    "@type": ["Gym", "LocalBusiness", "SportsActivityLocation", "HealthClub"] as const,
    "@id": bizId,
    name: publicBusinessName,
    alternateName: [
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
      "gym dar bouazza, salle de sport dar bouazza, fitness tamaris, coaching dar bouazza",
    amenityFeature: [
      "Musculation",
      "Cardio",
      "Coaching sportif",
      "Espace femmes",
      "Espace hommes",
      "Espace mixte",
    ],
    knowsAbout: [
      "Fitness",
      "Musculation",
      "Cardio training",
      "Coaching personnel",
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

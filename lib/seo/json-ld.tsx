import type { Locale } from "@/lib/i18n/config";
import { pagePath } from "@/lib/i18n/url";
import { siteConfig } from "@/lib/site/config";

type Props = { locale: string };

const baseUrl = () => siteConfig.siteUrl.replace(/\/$/, "");

function descriptions(locale: string): { business: string; org: string } {
  if (locale === "fr") {
    return {
      business:
        "Salle de sport à Dar Bouazza (Ansari) — espaces femmes, hommes et mixte, 7j/7. Gym, fitness et coaching.",
      org: "DB FIT — organisme exploitant une salle de sport et club de fitness à Dar Bouazza, Casablanca.",
    };
  }
  if (locale === "ar") {
    return {
      business:
        "نادي رياضي في دار بوعزة (أنصاري) — أقسام نساء ورجال ومختلط، مفتوح طوال الأسبوع.",
      org: "DB FIT — منشأة رياضية ونادي لياقة في دار بوعزة، كازابلانكا.",
    };
  }
  return {
    business:
      "Gym in Dar Bouazza (Ansari) — women’s, men’s, and mixed training zones. Fitness club open 7 days with coaching.",
    org: "DB FIT — fitness organization operating a gym and health club in Dar Bouazza, Casablanca, Morocco.",
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
  const mapsUrl = "https://www.google.com/maps?q=Dar+Bouazza+Ansari+Casablanca";

  const organization = {
    "@type": "Organization" as const,
    "@id": orgId,
    name: siteConfig.brand,
    url: pageUrl,
    logo: logoUrl,
    sameAs,
    description: org,
    image: siteConfig.heroPosterUrl,
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

  const localBusiness = {
    "@type": ["Gym", "LocalBusiness", "SportsActivityLocation", "HealthClub"] as const,
    "@id": bizId,
    name: siteConfig.brand,
    parentOrganization: { "@id": orgId },
    address: { ...postalAddress },
    hasMap: mapsUrl,
    description: business,
    url: pageUrl,
    telephone: `+${siteConfig.phoneE164}`,
    openingHours: "Mo-Su",
    image: siteConfig.heroPosterUrl,
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "Place" as const, name: "Dar Bouazza" },
      { "@type": "Place" as const, name: "Tamaris" },
      { "@type": "City" as const, name: "Casablanca" },
    ],
    sameAs,
    priceRange: "$$",
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

import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Répertoire du projet (absolu : évite resolve relatif au cwd ou au dossier workspace parent). */
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
);

/**
 * En dev, l’iPhone (ou un autre appareil sur le LAN) charge le site via
 * http://192.168.x.x:3000. Next.js compare l’en-tête Origin (hostname réel)
 * à une liste autorisée ; avec -H 0.0.0.0 seul "0.0.0.0" était autorisé, ce
 * qui bloquait les chunks /_next et le hot reload (site “cassé” en partie).
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
 */
const privateLanDevOrigins = [
  "192.168.*.*",
  "10.*.*.*",
  "172.*.*.*",
  "127.0.0.1",
] as const;

const tailwindCssEntry = path.join(
  projectRoot,
  "node_modules/tailwindcss/index.css",
);

/**
 * Ne pas lier `assetPrefix` à `NEXT_PUBLIC_SITE_URL` : les balises passeraient en absolu
 * vers l’apex configuré au build, alors que les visiteurs peuvent être sur `www`, ou
 * l’FTP peut cibler un sous-dossier — dans ces cas `/_next/static/*` ne correspond plus
 * et la page s’affiche sans CSS/JS.
 *
 * Déploiement à la racine du domaine : laisser `assetPrefix` vide (chemins `/_next/...`).
 * Sous-dossier uniquement : définir `NEXT_PUBLIC_ASSET_PREFIX` (et en général `basePath`)
 * au même préfixe, ex. `https://example.com/mon-site`.
 */
const explicitAssetPrefix =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_ASSET_PREFIX?.trim().replace(/\/$/, "") ?? "")
    : "";
const assetPrefix =
  explicitAssetPrefix.length > 0 ? explicitAssetPrefix : undefined;

const nextConfig: NextConfig = {
  ...(assetPrefix ? { assetPrefix } : {}),
  /** Export statique pour déploiement FTP (Hostinger) — voir `.github/workflows/ci-cd.yml`. */
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: [...privateLanDevOrigins],
  /** Masque l’icône / indicateur Next.js en bas à gauche en mode dev. */
  devIndicators: false,
  /**
   * Workspace ouvert sur un dossier parent : Turbopack résout parfois `@import "tailwindcss"`
   * depuis ce parent. `root` + `resolveAlias` (chemin absolu) alignent build et dev.
   *
   * Important : le build prod utilise `next build --webpack` (voir `package.json`) — avec
   * `output: 'export'` + Tailwind v4, le build Turbopack par défaut peut émettre un CSS
   * quasi vide (~quelques Ko dans `chunks/`) alors que Webpack produit la feuille complète
   * dans `_next/static/css/` (~tens of Ko).
   */
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindCssEntry,
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

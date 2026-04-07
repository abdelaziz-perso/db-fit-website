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
 * En prod, URLs absolues pour `/_next/static/*` si `NEXT_PUBLIC_SITE_URL` est défini
 * au build (déploiement FTP). Limite les soucis si le serveur réécrit mal les chemins
 * racine ou si l’URL affichée est /fr sans slash final.
 * Ex. : `NEXT_PUBLIC_SITE_URL=https://fitnessdarbouazza.ma npm run build`
 */
const productionSiteUrl =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "")
    : "";
const assetPrefix = productionSiteUrl.length > 0 ? productionSiteUrl : undefined;

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

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

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/logo-db-fit.jpg",
        permanent: false,
      },
    ];
  },
  images: {
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

import { siteConfig } from "@/lib/site/config";

/** Absolute URL for sitemaps, robots host checks, and JSON-LD. */
export function absoluteUrl(pathname: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  if (!pathname || pathname === "/") {
    return `${base}/`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function siteHostname(): string {
  try {
    return new URL(siteConfig.siteUrl).host;
  } catch {
    return siteConfig.siteUrl.replace(/^https?:\/\//, "").split("/")[0] ?? "";
  }
}

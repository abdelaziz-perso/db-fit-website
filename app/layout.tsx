import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { defaultLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  /** Évite <link rel="preload" crossorigin> des polices (soucis CORS / cache sur certains hébergeurs). */
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const base = new URL(siteConfig.siteUrl);

/** Valeurs globales uniquement — titre / OG / Twitter par route (`app/page`, `app/[locale]/layout`). */
export const metadata: Metadata = {
  metadataBase: base,
  applicationName: siteConfig.brand,
  /**
   * Favicons explicites (Google Search exige ≥48×48 + déclaration dans le HTML).
   * Fichiers : `public/favicon.ico`, `public/favicon-48x48.png` (+ liens dupliqués dans <head>).
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon-48x48.png",
        type: "image/png",
        sizes: "48x48",
      },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: "/apple-icon.png",
  },
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(siteConfig.googleSiteVerification
    ? {
        verification: {
          google: siteConfig.googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full min-w-0 overflow-x-clip antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full min-w-0 flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

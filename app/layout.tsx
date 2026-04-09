import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getMessages } from "@/lib/i18n/get-messages";
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

const defaultMessages = getMessages(defaultLocale);

const base = new URL(siteConfig.siteUrl);

export const metadata: Metadata = {
  metadataBase: base,
  title: defaultMessages.meta.title,
  description: defaultMessages.meta.description,
  applicationName: siteConfig.brand,
  /** Favicon ≥48×48 pour Google Search ; @see https://developers.google.com/search/docs/appearance/favicon-in-search */
  icons: {
    icon: [
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
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: base,
    siteName: siteConfig.brand,
    title: defaultMessages.meta.ogTitle ?? defaultMessages.meta.title,
    description:
      defaultMessages.meta.ogDescription ?? defaultMessages.meta.description,
    images: [
      {
        url: siteConfig.heroPosterUrl,
        width: 1200,
        height: 630,
        alt: defaultMessages.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMessages.meta.ogTitle ?? defaultMessages.meta.title,
    description:
      defaultMessages.meta.ogDescription ?? defaultMessages.meta.description,
    images: [siteConfig.heroPosterUrl],
  },
  alternates: {
    canonical: "/",
  },
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

import { defaultLocale } from "@/lib/i18n/config";

const defaultPath = `/${defaultLocale}/`;

/**
 * Export statique : pas de vrai redirect HTTP depuis ce fichier. La redirection
 * principale est dans `public/.htaccess` (Hostinger / Apache / LiteSpeed).
 * Script + lien : secours si .htaccess absent et pour navigateurs sans module rewrite.
 */
export default function RootPage() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(defaultPath)});`,
        }}
      />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        <a
          href={defaultPath}
          className="font-semibold text-brand underline underline-offset-4"
        >
          Continuer vers le site
        </a>
      </p>
    </div>
  );
}

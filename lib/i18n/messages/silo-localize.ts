import { PAGE_KEY_TO_SLUG } from "@/lib/i18n/silo-routes";
import type { MoneyRelatedLink } from "@/lib/i18n/types-silo";
import type { SiloPages } from "@/lib/i18n/types-silo";

type Head = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
};

export function localizeSiloPages(
  base: SiloPages,
  heads: Record<keyof SiloPages, Head>,
  related: (excludeSlug: string) => MoneyRelatedLink[],
): SiloPages {
  const keys = Object.keys(base) as (keyof SiloPages)[];
  const out = {} as SiloPages;
  for (const k of keys) {
    const slug = PAGE_KEY_TO_SLUG[k];
    out[k] = {
      ...base[k],
      ...heads[k],
      relatedLinks: related(slug),
    };
  }
  return out;
}

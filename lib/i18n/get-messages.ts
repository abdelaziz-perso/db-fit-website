import type { Locale } from "./config";
import type { Messages } from "./types";
import { ar } from "./messages/ar";
import { en } from "./messages/en";
import { fr } from "./messages/fr";

const byLocale: Record<Locale, Messages> = {
  fr,
  en,
  ar,
};

export function getMessages(locale: Locale): Messages {
  return byLocale[locale];
}

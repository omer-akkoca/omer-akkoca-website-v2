"use client";

import type tr from "./locales/tr.json";
import { useT } from "./useLocale";

export type TranslationKey = keyof typeof tr;

// Lets Server Components render translated text that follows the in-page
// language switch.
export default function T({ k }: { k: TranslationKey }) {
  const { t } = useT();
  return t(k);
}

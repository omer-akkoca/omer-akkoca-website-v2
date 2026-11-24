"use client";

import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { defaultLocale, i18n, isLocale, type Locale } from "./config";

function subscribe(callback: () => void) {
  i18n.on("languageChanged", callback);
  return () => i18n.off("languageChanged", callback);
}

const getLocale = (): Locale => (isLocale(i18n.language) ? i18n.language : defaultLocale);

/**
 * Current locale, hydration-safe: while React hydrates (including page
 * segments that hydrate after I18nProvider already switched the language) it
 * returns the server locale, then re-renders with the real one.
 */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale, () => defaultLocale);
}

/** Translation hook to use instead of `useTranslation()` in this project. */
export function useT() {
  const locale = useLocale();
  const { t } = useTranslation(undefined, { lng: locale });
  return { t, locale, changeLanguage: (next: Locale) => i18n.changeLanguage(next) };
}

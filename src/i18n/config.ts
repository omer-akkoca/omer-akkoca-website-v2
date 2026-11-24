import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";
export const LANG_STORAGE_KEY = "lang";

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

// `tr` is the source of truth for keys; `en` must provide every key.
export const resources = {
  tr: { translation: tr },
  en: { translation: en satisfies typeof tr },
} as const;

// Always starts in Turkish so server HTML and the first client render match;
// I18nProvider switches to the saved language after hydration.
export const i18n = createInstance();
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...locales],
  initAsync: false,
  interpolation: { escapeValue: false },
});

// Runs in <head> before first paint: hides the page until a saved English
// locale is applied, so Turkish doesn't flash on load.
export const langInitScript = `(function(){try{if(localStorage.getItem("${LANG_STORAGE_KEY}")==="en"){var d=document.documentElement;d.lang="en";d.setAttribute("data-lang-pending","")}}catch(e){}})()`;

"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { defaultLocale, i18n, isLocale, LANG_STORAGE_KEY } from "./config";

function readStoredLocale() {
  try {
    const value = localStorage.getItem(LANG_STORAGE_KEY);
    return isLocale(value) ? value : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function handleLanguageChanged(language: string) {
  document.documentElement.lang = language;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, language);
  } catch {}
}

function revealPage() {
  document.documentElement.removeAttribute("data-lang-pending");
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    i18n.on("languageChanged", handleLanguageChanged);

    // Server HTML is Turkish; apply the saved language after hydration and
    // reveal the page (hidden by langInitScript) once it has re-rendered.
    const stored = readStoredLocale();
    if (stored === i18n.language) revealPage();
    else i18n.changeLanguage(stored).then(() => requestAnimationFrame(revealPage));

    return () => i18n.off("languageChanged", handleLanguageChanged);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

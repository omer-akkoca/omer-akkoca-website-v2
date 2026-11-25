"use client";

import { useT } from "@/i18n/useLocale";
import { NAV_PILL_HOVER } from "./navStyles";

// Single button that shows the *other* language: "EN" while Turkish is active,
// "TR" while English is active.
export default function LanguageSwitcher() {
  const { t, locale, changeLanguage } = useT();
  const next = locale === "tr" ? "en" : "tr";
  const label = t(next === "en" ? "switchToEnglish" : "switchToTurkish");

  return (
    <button
      type="button"
      lang={next}
      onClick={() => changeLanguage(next)}
      aria-label={label}
      title={label}
      className={`cursor-pointer px-3 py-2 text-nav text-text uppercase transition-colors ${NAV_PILL_HOVER}`}
    >
      {next}
    </button>
  );
}

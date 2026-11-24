"use client";

import { locales } from "@/i18n/config";
import { useT } from "@/i18n/useLocale";

export default function LanguageSwitcher() {
  const { t, locale, changeLanguage } = useT();

  return (
    <div role="group" aria-label={t("language")} className="flex items-center gap-1 text-sm">
      {locales.map((item, index) => {
        const active = locale === item;
        return (
          <span key={item} className="flex items-center gap-1">
            {index > 0 && <span className="text-subtext">|</span>}
            <button
              type="button"
              onClick={() => changeLanguage(item)}
              aria-pressed={active}
              className={`cursor-pointer uppercase transition-colors ${
                active ? "font-semibold text-primary" : "text-subtext hover:text-text"
              }`}
            >
              {item}
            </button>
          </span>
        );
      })}
    </div>
  );
}

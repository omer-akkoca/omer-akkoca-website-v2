import dayjs, { type ConfigType } from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/tr";
import type { Locale } from "@/i18n/config";

// Single entry point for date formatting. The locale is passed per call (from
// useT().locale in @/i18n/useLocale) instead of setting dayjs' global locale, so dates follow the
// in-page TR/EN switch.
export function formatDate(date: ConfigType, locale: Locale, format = "MMMM YYYY") {
  return dayjs(date).locale(locale).format(format);
}

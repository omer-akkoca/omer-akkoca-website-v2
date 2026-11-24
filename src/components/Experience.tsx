"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { experience } from "@/data/experience";
import { useT } from "@/i18n/useLocale";
import { formatDate } from "@/lib/date";

/** Inclusive month count, LinkedIn-style (Sep 2023 – Jan 2024 = 5 months). */
function monthsBetween(start: string, end: string) {
  return dayjs(end).diff(dayjs(start), "month") + 1;
}

const noop = () => () => {};

/**
 * Current month ("YYYY-MM") on the client, null on the server: the page is
 * prerendered (cacheComponents), where reading the current time isn't allowed
 * and would freeze at build time anyway. Ongoing jobs show their duration once
 * hydrated.
 */
function useCurrentMonth() {
  return useSyncExternalStore(
    noop,
    () => dayjs().format("YYYY-MM"),
    () => null,
  );
}

export default function Experience() {
  const { t, locale } = useT();
  const currentMonth = useCurrentMonth();

  const duration = (start: string, end?: string) => {
    const until = end ?? currentMonth;
    if (!until) return null;
    const total = monthsBetween(start, until);
    const years = Math.floor(total / 12);
    const months = total % 12;
    return [
      years > 0 && t("durationYears", { count: years }),
      months > 0 && t("durationMonths", { count: months }),
    ]
      .filter(Boolean)
      .join(" ");
  };

  const durationText = (start: string, end?: string) => {
    const text = duration(start, end);
    return text ? ` · ${text}` : null;
  };

  return (
    <ul className="mt-3 flex flex-col gap-4">
      {experience.map(
        ({
          id,
          company,
          logo,
          roleKey,
          employmentTypeKey,
          descriptionKey,
          startDate,
          endDate,
        }) => (
          <li key={id} className="flex items-start gap-3">
            <Image
              src={logo}
              alt={company}
              width={42}
              height={42}
              className="size-8 shrink-0 rounded-md object-cover mt-1"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-entry font-medium text-text">{t(roleKey)}</h3>
                <p className="text-body shrink-0 text-subtext">
                  {formatDate(startDate, locale, "MMM YYYY")} –{" "}
                  {endDate ? formatDate(endDate, locale, "MMM YYYY") : t("present")}
                </p>
              </div>
              <p className="text-entry text-muted">
                {company} · {t(employmentTypeKey)}{durationText(startDate, endDate)}
              </p>
              <p className="mt-1 text-body whitespace-pre-line text-subtext">
                {t(descriptionKey)}
              </p>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}

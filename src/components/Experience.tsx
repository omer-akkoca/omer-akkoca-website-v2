"use client";

import dayjs from "dayjs";
import { motion } from "motion/react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import TextButton from "@/components/TextButton";
import { experience } from "@/data/experience";
import { useT } from "@/i18n/useLocale";
import { formatDate } from "@/lib/date";
import Paragraph from "./Paragraph";

/** Number of entries shown before "Show more". */
const VISIBLE_COUNT = 2;

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

// The extra entries are always in the DOM (and the server HTML, for SEO);
// collapsing only animates their height to 0.
export default function Experience() {
  const { t, locale } = useT();
  const currentMonth = useCurrentMonth();
  const [expanded, setExpanded] = useState(false);
  const hasMore = experience.length > VISIBLE_COUNT;

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

  const renderItem = ({
    id,
    company,
    logo,
    roleKey,
    employmentTypeKey,
    descriptionKey,
    startDate,
    endDate,
  }: (typeof experience)[number]) => (
    <li key={id} className="flex items-start gap-3">
      <Image
        src={logo}
        alt={company}
        width={42}
        height={42}
        className="size-10 shrink-0 rounded-md object-cover"
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
        <Paragraph id={`experience-${id}`} className="mt-1">
          {t(descriptionKey)}
        </Paragraph>
      </div>
    </li>
  );

  return (
    <div className="mt-3">
      <ul className="flex flex-col gap-4">
        {experience.slice(0, VISIBLE_COUNT).map(renderItem)}
      </ul>
      {hasMore && (
        <>
          <motion.div
            id="experience-more"
            initial={false}
            animate={{ height: expanded ? "auto" : 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            inert={!expanded}
          >
            {/* Padding (not margin) keeps the gap inside the animated height. */}
            <ul className="flex flex-col gap-4 pt-4">
              {experience.slice(VISIBLE_COUNT).map(renderItem)}
            </ul>
          </motion.div>
          <TextButton
            className="mt-2"
            label={t(expanded ? "showLess" : "showMore")}
            icon={expanded ? <FaChevronUp /> : <FaChevronDown />}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="experience-more"
          />
        </>
      )}
    </div>
  );
}

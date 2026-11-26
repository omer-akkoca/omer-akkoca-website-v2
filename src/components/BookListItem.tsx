"use client";

import Image from "next/image";
import { useT } from "@/i18n/useLocale";
import { formatDate } from "@/lib/date";

const DATE_FORMAT = "D MMM YYYY";

type BookListItemProps = {
  coverImage: string;
  title: string;
  author: string;
  /** Selected quote from the book; optional, shown in typographic quotation marks. */
  quote?: string;
  /** ISO date the book was started; the date range is hidden without it. */
  startedAt?: string;
  /** ISO date the book was finished; missing means still reading. */
  endedAt?: string;
  /** Book read continuously (`ended_at: "forever"`). */
  readForever?: boolean;
  /** Load the cover eagerly (for entries above the fold); the rest are lazy-loaded. */
  priority?: boolean;
};

// One entry of the /books reading list: uncropped cover on the left, title / author / quote on
// the right, top-aligned, with the reading dates in the bottom-right corner. No card or
// background; entries are separated by the list's dividers.
export default function BookListItem({
  coverImage,
  title,
  author,
  quote,
  startedAt,
  endedAt,
  readForever = false,
  priority = false,
}: BookListItemProps) {
  const { t, locale } = useT();

  return (
    <li className="py-6 first:pt-0 last:pb-0 sm:py-8">
      <article className="flex gap-4 sm:gap-7 lg:gap-9">
        <Image
          src={coverImage}
          alt={t("bookCoverAlt", { title })}
          width={365}
          height={600}
          priority={priority}
          sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
          className="h-auto w-24 shrink-0 self-start rounded-md object-contain shadow-[0_1px_2px_0,0_6px_16px_-4px] shadow-shadow/15 sm:w-32 lg:w-36 dark:shadow-shadow/5"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="text-section font-medium text-text wrap-break-word">
            {title}
          </h2>
          <h3 className="text-section mt-2 text-subtext">{author}</h3>
          {quote && (
            <blockquote className="mt-4 max-w-160 text-book-quote italic wrap-break-word text-subtext">
              <p>“{quote.trim()}”</p>
            </blockquote>
          )}
          {startedAt && (
            // mt-auto pushes the dates to the bottom of the column (as tall as the cover).
            <p className="mt-auto self-end pt-4 text-right text-book-date text-subtext">
              <time dateTime={startedAt}>{formatDate(startedAt, locale, DATE_FORMAT)}</time>
              {" – "}
              {endedAt ? (
                <time dateTime={endedAt}>{formatDate(endedAt, locale, DATE_FORMAT)}</time>
              ) : (
                t(readForever ? "bookReadForever" : "bookReadingNow")
              )}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

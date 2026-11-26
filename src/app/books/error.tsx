"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import BooksPageHeader from "@/components/BooksPageHeader";
import TextButton from "@/components/TextButton";
import { useT } from "@/i18n/useLocale";

// Shown when /books fails to render (e.g. Firestore is unreachable). Keeps the page header so the
// layout matches /books; `retry` re-fetches and re-renders the segment.
export default function BooksError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const { t } = useT();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-6">
      <BooksPageHeader />
      <p className="mt-10 text-page-subtitle text-subtext sm:mt-12">
        {t("booksError")}
      </p>
      <TextButton
        label={t("tryAgain")}
        icon={<FaArrowRotateRight />}
        onClick={retry}
        className="mt-4"
      />
    </main>
  );
}

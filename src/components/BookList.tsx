"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { loadMoreBooks } from "@/app/books/actions";
import BookListItem from "@/components/BookListItem";
import TextButton from "@/components/TextButton";
import { useT } from "@/i18n/useLocale";
import type { Book } from "@/lib/books";

type Props = {
  initialBooks: Book[];
  initialCursor: string | null;
};

// Single-column reading list with thin dividers between entries. The first page is
// server-rendered; "Load more" below the list fetches the next page through a Server Function.
export default function BookList({ initialBooks, initialCursor }: Props) {
  const { t } = useT();
  const [books, setBooks] = useState(initialBooks);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!cursor || loading) return;
    setLoading(true);
    try {
      const page = await loadMoreBooks(cursor);
      setBooks((prev) => [...prev, ...page.books]);
      setCursor(page.nextCursor);
    } catch {
      // Keep the cursor so the button can be pressed again.
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ul className="mt-10 divide-y divide-text/10 sm:mt-12">
        {books.map((book, index) => (
          <BookListItem
            key={book.id}
            coverImage={book.image}
            title={book.title}
            author={book.author}
            quote={book.description}
            startedAt={book.startedAt}
            endedAt={book.endedAt}
            readForever={book.readForever}
            priority={index < 3}
          />
        ))}
      </ul>
      {cursor && (
        <div className="mt-10 flex justify-center">
          <TextButton
            label={t(loading ? "loadingBooks" : "loadMore")}
            icon={loading ? undefined : <FaChevronDown />}
            onClick={loadMore}
          />
        </div>
      )}
    </>
  );
}

import type { Metadata } from "next";
import BookList from "@/components/BookList";
import BooksPageHeader from "@/components/BooksPageHeader";
import T from "@/i18n/T";
import { getBooksPage } from "@/lib/books";

export const metadata: Metadata = {
  title: "Kitaplar",
  description: "Okuduğum kitaplar ve onlardan aldığım fikirlerden bir derleme.",
  alternates: { canonical: "/books" },
};

export default async function BooksPage() {
  const { books, nextCursor } = await getBooksPage();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-6">
      <BooksPageHeader />
      {books.length > 0 ? (
        <BookList initialBooks={books} initialCursor={nextCursor} />
      ) : (
        <p className="mt-10 text-page-subtitle text-subtext sm:mt-12">
          <T k="noBooks" />
        </p>
      )}
    </main>
  );
}

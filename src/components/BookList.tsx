import BookCard from "@/components/BookCard";
import T from "@/i18n/T";
import { getLatestBooks } from "@/lib/books";

// Home page preview: the last 6 books, 6 per row on wide screens, 3 on tablets, 2 on phones.
export default async function BookList() {
  const books = await getLatestBooks(6);

  if (books.length === 0) {
    return (
      <p className="mt-4 text-subtext">
        <T k="noBooks" />
      </p>
    );
  }

  return (
    <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}

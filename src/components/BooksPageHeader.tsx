import T from "@/i18n/T";

// Left-aligned introduction of the /books page: the page's only h1 and a short subtitle.
export default function BooksPageHeader() {
  return (
    <header>
      <h1 className="text-name text-text font-medium">
        <T k="books" />
      </h1>
      <h2 className="text-title text-subtext">
        <T k="booksIntro" />
      </h2>
    </header>
  );
}

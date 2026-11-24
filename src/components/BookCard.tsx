import Image from "next/image";
import type { Book } from "@/lib/books";

// Book cover (385×600).
export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex min-w-0 flex-col gap-2">
      <Image
        src={book.image}
        alt={book.title}
        width={385}
        height={600}
        sizes="(min-width: 768px) 120px, (min-width: 640px) 33vw, 50vw"
        className="aspect-385/600 w-full rounded-lg object-cover shadow-lg"
      />
    </article>
  );
}

import { cacheLife } from "next/cache";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  type QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

const BOOKS_COLLECTION = "books-read";

export type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  description?: string;
  /** ISO date string. */
  startedAt?: string;
  /** ISO date string. */
  endedAt?: string;
};

// Only real Timestamps become dates; other values (e.g. `ended_at: "forever"` for books that are
// read continuously) are treated as "no date".
function toIso(value: unknown) {
  return value instanceof Timestamp ? value.toDate().toISOString() : undefined;
}

// The single place where Firestore fields are mapped to a Book.
export function mapBook(doc: QueryDocumentSnapshot): Book {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title ?? "",
    author: data.author ?? "",
    image: data.image ?? "",
    description: data.description,
    startedAt: toIso(data.started_at),
    endedAt: toIso(data.ended_at),
  };
}

/**
 * Most recently started books (includes ones still being read). Sorted by `started_at` because
 * `ended_at` mixes Timestamps with the string "forever".
 */
export async function getLatestBooks(count = 6): Promise<Book[]> {
  "use cache";
  cacheLife("hours");

  const snapshot = await getDocs(
    query(
      collection(db, BOOKS_COLLECTION),
      orderBy("started_at", "desc"),
      limit(count),
    ),
  );
  return snapshot.docs.map(mapBook);
}

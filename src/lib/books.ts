import { cacheLife } from "next/cache";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  type DocumentSnapshot,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

const BOOKS_COLLECTION = "books-read";

export const BOOKS_PAGE_SIZE = 10;

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
  /** `ended_at` is "forever": a book that is read continuously. */
  readForever: boolean;
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
    readForever: data.ended_at === "forever",
  };
}

export type BooksPage = {
  books: Book[];
  /** Id of the last book on this page, or `null` when there are no more books. */
  nextCursor: string | null;
};

// Documents read per Firestore request while filling a page.
const FETCH_BATCH_SIZE = 20;

// Only books with a real end: an `ended_at` Timestamp or "forever". Books whose `ended_at` is
// missing, null or anything else (e.g. "") are not listed.
function hasEndedAt(doc: QueryDocumentSnapshot) {
  const endedAt = doc.get("ended_at");
  return endedAt instanceof Timestamp || endedAt === "forever";
}

/**
 * One page of listed books (see `hasEndedAt`), newest `started_at` first. `afterId` is the
 * previous page's `nextCursor`.
 *
 * The `ended_at` filter runs here rather than in the query: `where("ended_at", "!=", null)` with
 * `orderBy("started_at")` needs a composite Firestore index. Documents are read in batches until
 * the page plus one extra book (to know whether another page exists) is filled.
 */
export async function getBooksPage(afterId?: string): Promise<BooksPage> {
  "use cache";
  cacheLife("hours");

  const books = collection(db, BOOKS_COLLECTION);
  let cursor: DocumentSnapshot | undefined;
  if (afterId) {
    cursor = await getDoc(doc(books, afterId));
    if (!cursor.exists()) return { books: [], nextCursor: null };
  }

  const listed: QueryDocumentSnapshot[] = [];
  while (listed.length <= BOOKS_PAGE_SIZE) {
    const constraints: QueryConstraint[] = [orderBy("started_at", "desc")];
    if (cursor) constraints.push(startAfter(cursor));
    constraints.push(limit(FETCH_BATCH_SIZE));

    const snapshot = await getDocs(query(books, ...constraints));
    listed.push(...snapshot.docs.filter(hasEndedAt));
    if (snapshot.docs.length < FETCH_BATCH_SIZE) break;
    cursor = snapshot.docs[snapshot.docs.length - 1];
  }

  const page = listed.slice(0, BOOKS_PAGE_SIZE).map(mapBook);
  const hasMore = listed.length > BOOKS_PAGE_SIZE;
  return { books: page, nextCursor: hasMore ? page[page.length - 1].id : null };
}

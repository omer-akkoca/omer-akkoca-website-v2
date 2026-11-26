"use server";

import { getBooksPage } from "@/lib/books";

// Read-only: loads the next page of books for the infinite scroll on /books.
export async function loadMoreBooks(afterId: string) {
  return getBooksPage(afterId);
}

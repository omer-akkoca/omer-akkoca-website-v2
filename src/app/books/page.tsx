import type { Metadata } from "next";
import Link from "next/link";
import T from "@/i18n/T";

export const metadata: Metadata = {
  title: "Kitaplar",
  description: "Okuduğum kitaplar.",
  alternates: { canonical: "/books" },
};

export default function BooksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm text-primary underline-offset-4 hover:underline">
        <T k="backHome" />
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">
        <T k="books" />
      </h1>
      <p className="mt-8 text-subtext">
        <T k="noBooks" />
      </p>
    </main>
  );
}

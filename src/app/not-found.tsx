import type { Metadata } from "next";
import T from "@/i18n/T";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
};

// Rendered inside the root layout for unmatched URLs and `notFound()` calls.
// Next.js adds `noindex` to this page automatically.
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6">
      <h1 className="text-not-found-message text-text">
        <T k="notFoundMessage" />
      </h1>
      <p aria-hidden className="text-not-found-code font-semibold text-primary">
        404
      </p>
    </main>
  );
}

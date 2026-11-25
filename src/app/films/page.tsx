import type { Metadata } from "next";
import T from "@/i18n/T";

export const metadata: Metadata = {
  title: "Film/Tiyatro",
  description: "İzlediğim filmler ve tiyatro oyunları.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">
        <T k="films" />
      </h1>
      <p className="mt-8 text-subtext">
        <T k="noFilms" />
      </p>
    </main>
  );
}

const PRODUCTION_URL = "https://omerakkoca.com";

// NEXT_PUBLIC_SITE_URL wins when set (an empty value counts as unset). Otherwise Vercel production
// builds use the real domain, so canonical URLs, sitemap and robots never point at localhost.
// Trailing slashes are trimmed so `${url}/books` stays clean.
const url = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000")
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Ömer Akkoca",
  /** Hero'da gösterilen yazım. */
  displayName: "Ömer AKKOCA",
  description: "Ömer Akkoca — kişisel web sitesi ve özgeçmiş.",
  url,
};

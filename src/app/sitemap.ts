import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/books`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/films`, changeFrequency: "weekly", priority: 0.7 },
  ];
}

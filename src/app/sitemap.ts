import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";
import { photos } from "@/content/photos";
import { chapters } from "@/content/chapters";
import { posts } from "@/content/journal";

/**
 * Every indexable URL, with an honest priority. The photograph pages are the
 * reason this site will rank in image search, so they are not buried.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absolute("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absolute("/chapters"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/hire"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absolute("/journal"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absolute("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const chapterUrls: MetadataRoute.Sitemap = chapters.map((c) => ({
    url: absolute(`/chapters/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const photoUrls: MetadataRoute.Sitemap = photos.map((p) => ({
    url: absolute(`/work/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absolute(`/journal/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...fixed, ...chapterUrls, ...photoUrls, ...postUrls];
}

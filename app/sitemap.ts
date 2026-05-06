import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://yourportfolio.com";
  const [projects, posts] = await Promise.all([
    client.fetch<Array<{ slug?: { current?: string } }>>(`*[_type == "project" && defined(slug.current)]{slug}`),
    client.fetch<Array<{ slug?: { current?: string } }>>(`*[_type == "post" && defined(slug.current)]{slug}`),
  ]);
  const now = new Date();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    ...projects.flatMap((p) => (p.slug?.current ? [{ url: `${base}/projects/${p.slug.current}`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now }] : [])),
    ...posts.flatMap((p) => (p.slug?.current ? [{ url: `${base}/blog/${p.slug.current}`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now }] : [])),
  ];
}

import type { MetadataRoute } from "next";
import env from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/studio" }],
    sitemap: `${env.site.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // The optimizer endpoint is an implementation detail, not a gallery.
      // Google should index /work/<slug>, where the photograph has its story.
      { userAgent: "*", disallow: "/_next/image" },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://id.povixa.cloud";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/terms", "/privacy"],
        disallow: ["/auth/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import { getArticles } from "@/api/articles.api";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic"; // Desactiva la pre-renderización estática

export async function GET() {
  const articles = await getArticles();
  const articleEntries = articles.map((article) => ({
    url: `https://foundseek.com/${article.slug}/${article.id}`,
    lastModified: article.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "https://foundseek.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...articleEntries,
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map(
          (entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}

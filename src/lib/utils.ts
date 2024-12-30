import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IArticle } from "@/lib/declarations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function utilJsonLdArticle(article: IArticle) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": new Date(article.publishedAt).toISOString(),
    "author": article.authors.map(author => ({
      "@type": "Person",
      "name": author.name,
    })),
    "image": {
      "@type": "ImageObject",
      "url": article.image_url,
      "width": 1200,
      "height": 800,
    },
  });
}


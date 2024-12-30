import { Metadata } from "next";
import { IArticle } from "./declarations";

export function generateArticleMetadata(
  article: IArticle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...parentImages: any[]
): Metadata {
  return {
    title: article.title,
    abstract: article.abstract,
    authors: article.authors,
    description: article.description,
    keywords: article.keywords?.join(", "),
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image_url, ...parentImages],
    },
  };
}

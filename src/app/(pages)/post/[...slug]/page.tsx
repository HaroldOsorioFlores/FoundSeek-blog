import React from "react";
import Script from "next/script";
import type { Metadata, ResolvingMetadata } from "next";

import { getArticleById } from "@/api/articles.api";
import AvatarAuthor from "@/components/avatar";
import { utilJsonLdArticle } from "@/lib/utils";
import { generateArticleMetadata } from "@/lib/seo";
import { ContentRenderer } from "@/components/contentRenderer";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const id = slug[1];

  const fetchArticle = await getArticleById(id);
  const previousImages = (await parent).openGraph?.images || [];

  if (!fetchArticle) return {};

  return generateArticleMetadata(fetchArticle, previousImages);
}

export default function Post({
  params,
}: Readonly<{
  params: Promise<{ slug: string[] }>;
}>) {
  const slug = React.use(params).slug;
  const id = slug[1];

  const fetchArticle = React.use(getArticleById(id));

  if (!fetchArticle) return <div>No se encontro el articulo</div>;

  const dateArticle = new Date(fetchArticle.publishedAt).toLocaleDateString(
    "es-PE"
  );

  const jsonLd = utilJsonLdArticle(fetchArticle);

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="max-w-4xl w-full mx-auto py-6 sm:px-6 lg:px-8 flex-grow article">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert flex flex-col gap-4">
              <header className="mb-4 not-format">
                {fetchArticle.authors.map((author, index) => (
                  <AvatarAuthor author={author} key={author.name + index} />
                ))}
                <p className="text-base text-gray-500 dark:text-gray-400 flex space-x-2 my-2">
                  <span>Publicado</span>
                  <time dateTime={"2022-02-08"} title="February 8th, 2022">
                    {dateArticle}
                  </time>
                </p>
                <h1 className="font-extrabold leading-tight text-gray-900 lg:text-4xl text-lg dark:text-white">
                  {fetchArticle.title}
                </h1>
              </header>
              {fetchArticle.content.map((content, index) => (
                <ContentRenderer content={content} key={content.type + index} />
              ))}
              {/* <figure><img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt="">
              <figcaption>Digital art by Anonymous</figcaption>
          </figure>
           */}
            </article>
          </div>
        </main>

        {/* <aside
        aria-label="Related articles"
        className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Articulos Relacionados
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <article className="max-w-xs">
              <a href="#"></a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>
          </div>
        </div>
      </aside> */}
      </div>
    </>
  );
}

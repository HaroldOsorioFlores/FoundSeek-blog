import { getAllPosts } from "@/lib/turso/posts";
import React from "react";

export default async function Home() {
  const posts = await getAllPosts();
  console.log({ posts });
  return (
    <main className="max-w-7xl mx-auto p-6 lg:px-8 flex-grow">
      {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fetchCategories.map((category) => (
              <CardCategory category={category} key={category.name} />
            ))}
          </div>
        </section> */}

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Artículos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {fetchArticles.map((post) => (
            <CardArticle post={post} key={post.title} />
          ))} */}
        </div>
      </section>
    </main>
  );
}

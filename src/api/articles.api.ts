import { BASE_URL } from "@/lib/config";
import { IArticle } from "@/lib/declarations";

export async function getArticles(): Promise<IArticle[]> {
  try {
    const res = await fetch(BASE_URL + "articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data: IArticle[] = await res.json();

    return data;
  } catch (error) {
    console.error("Error en getArticles:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error desconocido"
    );
  }
}

export async function getArticleById(id: string): Promise<IArticle | null> {
  try {
    const res = await fetch(`${BASE_URL}articles/${id}`, { cache: "no-store" });
    const article: IArticle = await res.json();

    if (!article) return null;

    return article;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(error + "");
  }
}

// app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { IArticle } from "@/lib/declarations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const filePath = path.join(process.cwd(), "/src/data", "articles.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: IArticle[] = JSON.parse(fileContents);
    const article = data.find((article) => article.id === id);

    if (!article) {
      return NextResponse.json(
        { message: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener el artículo" },
      { status: 500 }
    );
  }
}

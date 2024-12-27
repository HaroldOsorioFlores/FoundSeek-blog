// app/api/articles/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { IArticle } from "@/lib/declarations";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "/src/data", "articles.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: IArticle[] = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener los artículos" },
      { status: 500 }
    );
  }
}

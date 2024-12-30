"use server";

import { IArticle } from "@/lib/declarations";
import fs from "fs";
import path from "path";

export async function articles() {
  try {
    const filePath = path.join(process.cwd(), "/src/data", "articles.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: IArticle[] = await JSON.parse(fileContents);

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Error al obtener los artículos");
  }
}

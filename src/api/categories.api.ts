import path from "path";
import fs from "fs";
import { ICategory } from "@/lib/declarations";

export const getCategories = (): ICategory[] => {
  try {
    const filePath = path.join(process.cwd(), "/src/data", "categories.json");

    const fileContents = fs.readFileSync(filePath, "utf8");

    const data: ICategory[] = JSON.parse(fileContents);

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(error + "");
  }
};

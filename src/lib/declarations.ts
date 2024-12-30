import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: keyof typeof dynamicIconImports;
}

export interface IAuthor {
  id: string;
  name: string;
  description: string;
  short_name: string;
  image_url: string;
}

export interface IArticle {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  abstract: string;
  keywords: string[];
  slug: string;
  authors: IAuthor[];
  tags: string[];
  image_url: string;
  publishedAt: string;
  updatedAt: string;

  categories: ICategory[];
  content: IContent[];
  timeRead: string;
}

export interface IContent {
  type: "heading" | "paragraph" | "image" | "list" | "richtext" | "code";
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Solo para encabezados
  text?: string; // Para encabezados y párrafos
  src?: string; // Para imágenes
  alt?: string; // Para imágenes
  width?: number; // Para imágenes
  height?: number; // Para imágenes
  items?: string[]; // Para listas
  ordered?: boolean; // Para listas
  content?: string;
  code?: string;
}

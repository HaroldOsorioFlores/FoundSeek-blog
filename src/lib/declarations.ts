import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface ICategory {
  name: string;
  description: string;
  color: string;
  icon: keyof typeof dynamicIconImports;
}

export interface IContent {
  type: string;
  text: string;
  image_url: string;
}

export interface IAuthor {
  name: string;
  description: string;
  short_name: string;
  image_url: string;
}

export interface IArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  author: IAuthor;
  tags: string;
  image_url: string;
  publishedAt: string;
  categories: ICategory[];
  content: IContent[];
  timeRead: string;
}

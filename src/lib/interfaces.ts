export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  role: string; // Default: 'author'
  createdAt: string; // DATETIME as ISO string
  updatedAt: string; // DATETIME as ISO string
}

export interface Category {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string; // DATETIME as ISO string
  updatedAt: string; // DATETIME as ISO string
}

export interface Tag {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  createdAt: string; // DATETIME as ISO string
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string | null;
  featured: boolean; // Default: false
  visibility: string; // Default: 'public'
  status: string; // Default: 'published'
  featuredImage: string | null;
  featuredImageAlt: string | null;
  featuredImageCaption: string | null;
  customExcerpt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  readingTime: number | null;
  commentId: string | null;
  user: User; // Cambiado de author_id
  categoryId: string | null;
  tags: Tag[]; // Incluye tags directamente
  createdAt: string; // DATETIME as ISO string
  updatedAt: string; // DATETIME as ISO string
  publishedAt: string | null; // DATETIME as ISO string
}

export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  password_hash: string;
  role: string; // Default: 'author'
  created_at: string; // DATETIME as ISO string
  updated_at: string; // DATETIME as ISO string
}

export interface Category {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string; // DATETIME as ISO string
  updated_at: string; // DATETIME as ISO string
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
  featured_image: string | null;
  featured_image_alt: string | null;
  featured_image_caption: string | null;
  custom_excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  reading_time: number | null;
  comment_id: string | null;
  author_id: string;
  category_id: string | null;
  created_at: string; // DATETIME as ISO string
  updated_at: string; // DATETIME as ISO string
  published_at: string | null; // DATETIME as ISO string
}

export interface Tag {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  created_at: string; // DATETIME as ISO string
}

export interface PostTag {
  post_id: string;
  tag_id: string;
  created_at: string; // DATETIME as ISO string
}

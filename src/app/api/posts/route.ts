import { turso } from "@/lib/config-server";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  try {
    // Query para obtener todos los posts con sus relaciones
    const query = `
      SELECT 
        p.*,
        u.name as author_name,
        u.email as author_email,
        c.name as category_name,
        c.slug as category_slug,
        GROUP_CONCAT(t.name) as tag_names,
        GROUP_CONCAT(t.slug) as tag_slugs
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    const result = await turso.execute(query);
    
    // Transformar los resultados para incluir tags como array
    const posts = result.rows.map((row: any) => ({
      ...row,
      tags: row.tag_names ? row.tag_names.split(',').map((name: string, index: number) => ({
        name: name,
        slug: row.tag_slugs.split(',')[index]
      })) : []
    }));

    return NextResponse.json({ 
      success: true, 
      data: posts 
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validación básica de campos requeridos
    const {
      title,
      html,
      authorId,
      tags = [],
      categoryId,
      excerpt,
      featured = false,
      visibility = 'public',
      status = 'published',
      featuredImage,
      featuredImageAlt,
      featuredImageCaption,
      customExcerpt,
      metaTitle,
      metaDescription,
      canonicalUrl,
      readingTime,
      commentId,
      publishedAt
    } = body;

    if (!title || !html || !authorId) {
      return NextResponse.json(
        { error: "Title, html, and authorId are required" },
        { status: 400 }
      );
    }

    // Generar ID y UUID
    const id = randomUUID();
    const uuid = randomUUID();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Iniciar transacción
    await turso.execute("BEGIN TRANSACTION");

    try {
      // Insertar el post
      const insertPostQuery = `
        INSERT INTO posts (
          id, uuid, title, slug, html, excerpt, featured, visibility, status,
          featured_image, featured_image_alt, featured_image_caption,
          custom_excerpt, meta_title, meta_description, canonical_url,
          reading_time, comment_id, author_id, category_id, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await turso.execute(insertPostQuery, [
        id, uuid, title, slug, html, excerpt || null, featured, visibility, status,
        featuredImage || null, featuredImageAlt || null, featuredImageCaption || null,
        customExcerpt || null, metaTitle || null, metaDescription || null, canonicalUrl || null,
        readingTime || null, commentId || null, authorId, categoryId || null, publishedAt || null
      ]);

      // Insertar tags si existen
      if (tags.length > 0) {
        for (const tagName of tags) {
          // Primero, verificar si el tag existe, si no, crearlo
          const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const tagId = randomUUID();
          
          await turso.execute(`
            INSERT OR IGNORE INTO tags (id, uuid, name, slug, created_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
          `, [tagId, randomUUID(), tagName, tagSlug]);

          // Obtener el ID del tag (ya sea existente o recién creado)
          const tagResult = await turso.execute(
            "SELECT id FROM tags WHERE slug = ?",
            [tagSlug]
          );
          
          if (tagResult.rows.length > 0) {
            const actualTagId = tagResult.rows[0].id;
            
            // Insertar la relación post-tag
            await turso.execute(`
              INSERT INTO post_tags (post_id, tag_id, created_at)
              VALUES (?, ?, CURRENT_TIMESTAMP)
            `, [id, actualTagId]);
          }
        }
      }

      // Confirmar transacción
      await turso.execute("COMMIT");

      return NextResponse.json({ 
        success: true, 
        message: "Post created successfully",
        data: { id, uuid, slug }
      });
    } catch (error) {
      // Revertir transacción en caso de error
      await turso.execute("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

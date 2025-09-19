import { turso } from "../config-server";

export async function getAllPosts() {
  const { rows } = await turso.execute(`
    SELECT * 
    FROM posts 
    ORDER BY created_at DESC
  `);
  return rows;
}

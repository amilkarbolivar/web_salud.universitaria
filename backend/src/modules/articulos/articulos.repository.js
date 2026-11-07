import { pool } from "../../config/db.js";

export async function findAll() {
  const { rows } = await pool.query(
    "SELECT id AS id_articulo, titulo, contenido, multimedia_url, fecha_publicacion FROM articulos ORDER BY fecha_publicacion DESC, id DESC"
  );
  return rows;
}

export async function findById(id) {
  const { rows } = await pool.query(
    "SELECT id AS id_articulo, titulo, contenido, multimedia_url, fecha_publicacion FROM articulos WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}
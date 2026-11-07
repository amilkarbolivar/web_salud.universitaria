import { pool } from "../../config/db.js";

export async function findAll() {
  const { rows } = await pool.query(
    `SELECT f.id, f.nombre_foro, f.descripcion, f.fecha_creacion,
            u.id AS id_usuario_id, u.nombre AS id_usuario_nombre
     FROM foros f
     LEFT JOIN users u ON u.id = f.id_usuario
     ORDER BY f.fecha_creacion DESC`
  );
  return rows.map(mapForo);
}

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT f.id, f.nombre_foro, f.descripcion, f.fecha_creacion,
            u.id AS id_usuario_id, u.nombre AS id_usuario_nombre
     FROM foros f
     LEFT JOIN users u ON u.id = f.id_usuario
     WHERE f.id = $1`,
    [id]
  );
  return rows[0] ? mapForo(rows[0]) : null;
}

function mapForo(r) {
  return {
    id: r.id,
    nombre_foro: r.nombre_foro,
    descripcion: r.descripcion,
    fecha_creacion: r.fecha_creacion,
    id_usuario: r.id_usuario_id ? { id_usuario: r.id_usuario_id, nombre: r.id_usuario_nombre } : null,
  };
}

export async function create({ nombre_foro, descripcion, id_usuario }) {
  const { rows } = await pool.query(
    `INSERT INTO foros (nombre_foro, descripcion, id_usuario)
     VALUES ($1,$2,$3)
     RETURNING id, nombre_foro, descripcion, fecha_creacion, id_usuario`,
    [nombre_foro, descripcion, id_usuario || null]
  );
  const row = rows[0];
  return {
    id: row.id,
    nombre_foro: row.nombre_foro,
    descripcion: row.descripcion,
    fecha_creacion: row.fecha_creacion,
    id_usuario: row.id_usuario ? { id_usuario: row.id_usuario } : null,
  };
}

export async function findMensajes(idForo) {
  const { rows } = await pool.query(
    "SELECT id, id_foro, contenido, autor, fecha FROM mensajes WHERE id_foro = $1 ORDER BY fecha ASC",
    [idForo]
  );
  return rows;
}

export async function createMensaje({ idForo, contenido, autor, id_usuario }) {
  const { rows } = await pool.query(
    `INSERT INTO mensajes (id_foro, contenido, autor, id_usuario)
     VALUES ($1,$2,$3,$4)
     RETURNING id, id_foro, contenido, autor, fecha`,
    [idForo, contenido, autor || null, id_usuario || null]
  );
  return rows[0];
}
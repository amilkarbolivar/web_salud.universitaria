import { pool } from "../../config/db.js";

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT id, nombre, apodo, email, password_hash, cargo, created_at FROM users WHERE email = $1",
    [email]
  );
  return rows[0] || null;
}

export async function findUserByApodo(apodo) {
  const { rows } = await pool.query("SELECT id FROM users WHERE apodo = $1", [apodo]);
  return rows[0] || null;
}

export async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, nombre, apodo, email, cargo, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}

export async function createUser({ nombre, apodo, email, passwordHash, cargo }) {
  const { rows } = await pool.query(
    `INSERT INTO users (nombre, apodo, email, password_hash, cargo)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, nombre, apodo, email, cargo, created_at`,
    [nombre, apodo, email, passwordHash, cargo || "usuario"]
  );
  return rows[0];
}
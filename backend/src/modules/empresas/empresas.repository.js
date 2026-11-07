import { pool } from "../../config/db.js";

export async function findAll() {
  const { rows } = await pool.query(
    "SELECT id, nombre_empresa, descrip_empresa, correo_empresa, telefono_empresa, url_empresa FROM empresas ORDER BY nombre_empresa ASC"
  );
  return rows;
}
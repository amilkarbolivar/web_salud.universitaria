import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../config/db.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    logger.info({ file }, "Aplicando migración");
    await pool.query(sql);
  }

  logger.info("Migraciones aplicadas");
  await pool.end();
}

main().catch((err) => {
  logger.error(err, "Error en migración");
  process.exit(1);
});
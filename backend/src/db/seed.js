import { pool } from "../config/db.js";
import { logger } from "../utils/logger.js";

const articulos = [
  {
    titulo: "Cuidar tu salud mental es un acto de valentía",
    contenido:
      "Hablar sobre cómo nos sentimos no es signo de debilidad. Buscar apoyo profesional y social es un paso importante para el bienestar emocional.",
    multimedia_url: "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
  },
  {
    titulo: "La importancia del sueño en el bienestar",
    contenido:
      "Dormir lo suficiente ayuda a regular el estado de ánimo y a mejorar la capacidad de concentración. Intenta mantener horarios regulares de descanso.",
    multimedia_url: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg",
  },
];

const empresas = [
  {
    nombre_empresa: "Línea de Atención en Crisis 123",
    descrip_empresa: "Atención psicológica y orientación en situaciones de crisis. Servicio gratuito y confidencial.",
    correo_empresa: "contacto@linea123.org",
    telefono_empresa: "123",
    url_empresa: "https://example.org/linea123",
  },
  {
    nombre_empresa: "Centro de Bienestar Universitario",
    descrip_empresa: "Acompañamiento psicológico para estudiantes universitarios.",
    correo_empresa: "bienestar@universidad.edu",
    telefono_empresa: "+57 601 000 0000",
    url_empresa: "https://example.org/bienestar",
  },
];

async function seedTable(table, rows, insertFn) {
  const { rows: existing } = await pool.query(`SELECT COUNT(*)::int AS c FROM ${table}`);
  if (existing[0].c > 0) {
    logger.info({ table }, "Tabla ya tiene datos, se omite seed");
    return;
  }
  for (const row of rows) {
    await insertFn(row);
  }
  logger.info({ table, count: rows.length }, "Seed insertado");
}

async function main() {
  await seedTable("articulos", articulos, async (a) => {
    await pool.query(
      "INSERT INTO articulos (titulo, contenido, multimedia_url) VALUES ($1,$2,$3)",
      [a.titulo, a.contenido, a.multimedia_url]
    );
  });

  await seedTable("empresas", empresas, async (e) => {
    await pool.query(
      "INSERT INTO empresas (nombre_empresa, descrip_empresa, correo_empresa, telefono_empresa, url_empresa) VALUES ($1,$2,$3,$4,$5)",
      [e.nombre_empresa, e.descrip_empresa, e.correo_empresa, e.telefono_empresa, e.url_empresa]
    );
  });

  logger.info("Seed completado");
  await pool.end();
}

main().catch((err) => {
  logger.error(err, "Error en seed");
  process.exit(1);
});
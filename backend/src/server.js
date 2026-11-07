import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { closePool } from "./config/db.js";
import app from "./app.js";

const server = app.listen(env.port, () => {
  logger.info({ port: env.port, env: env.nodeEnv }, "Servidor iniciado");
});

function shutdown(signal) {
  logger.info({ signal }, "Cerrando servidor");
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
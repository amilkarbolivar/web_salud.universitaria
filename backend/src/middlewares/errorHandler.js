import { logger } from "../utils/logger.js";

export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Recurso no encontrado" });
}

export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = status >= 500 ? "Error interno del servidor" : err.message;

  if (status >= 500) {
    logger.error({ err, path: req.path }, "Error no controlado");
  } else {
    logger.warn({ status, path: req.path, message: err.message }, "Error de cliente");
  }

  const payload = { error: message };
  if (err.details && process.env.NODE_ENV !== "production") {
    payload.details = err.details;
  }
  res.status(status).json(payload);
}
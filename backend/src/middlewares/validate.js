import { validationResult } from "express-validator";
import { HttpError } from "./errorHandler.js";

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(422, "Datos de entrada inválidos", errors.array()));
  }
  next();
}
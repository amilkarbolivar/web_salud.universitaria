import { body } from "express-validator";

export const registerRules = [
  body("nombre").trim().isLength({ min: 2, max: 120 }).withMessage("Nombre inválido"),
  body("apodo").trim().isLength({ min: 3, max: 60 }).withMessage("Apodo inválido"),
  body("correo").trim().isEmail().withMessage("Correo inválido").normalizeEmail(),
  body("contraseña").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

export const loginRules = [
  body("correo").trim().isEmail().withMessage("Correo inválido").normalizeEmail(),
  body("contraseña").notEmpty().withMessage("Contraseña requerida"),
];
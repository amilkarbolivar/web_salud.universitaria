import bcrypt from "bcryptjs";
import { HttpError } from "../../middlewares/errorHandler.js";
import * as repo from "./auth.repository.js";

const SALT_ROUNDS = 12;

export async function register({ nombre, apodo, correo, contraseña }) {
  const existingEmail = await repo.findUserByEmail(correo);
  if (existingEmail) throw new HttpError(409, "El correo ya está registrado");

  const existingApodo = await repo.findUserByApodo(apodo);
  if (existingApodo) throw new HttpError(409, "El apodo ya está en uso");

  const passwordHash = await bcrypt.hash(contraseña, SALT_ROUNDS);
  const user = await repo.createUser({
    nombre,
    apodo,
    email: correo,
    passwordHash,
    cargo: "usuario",
  });
  return user;
}

export async function login({ correo, contraseña }) {
  const user = await repo.findUserByEmail(correo);
  if (!user) throw new HttpError(401, "Correo o contraseña incorrectos");
  const ok = await bcrypt.compare(contraseña, user.password_hash);
  if (!ok) throw new HttpError(401, "Correo o contraseña incorrectos");
  const safe = { ...user };
  delete safe.password_hash;
  return safe;
}

export async function getProfile(id) {
  const user = await repo.findUserById(id);
  if (!user) throw new HttpError(404, "Usuario no encontrado");
  return user;
}
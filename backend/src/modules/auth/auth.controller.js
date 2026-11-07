import { signToken, setAuthCookie, clearAuthCookie } from "../../middlewares/auth.js";
import * as service from "./auth.service.js";

export async function register(req, res, next) {
  try {
    const { nombre, apodo, correo, contraseña } = req.body;
    const user = await service.register({ nombre, apodo, correo, contraseña });
    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { correo, contraseña } = req.body;
    const user = await service.login({ correo, contraseña });
    const token = signToken(user);
    setAuthCookie(res, token);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req, res) {
  clearAuthCookie(res);
  res.status(204).send();
}

export async function me(req, res, next) {
  try {
    const user = await service.getProfile(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "./errorHandler.js";

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, cargo: user.cargo },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res) {
  res.clearCookie("token", { path: "/" });
}

export function requireAuth(req, _res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return next(new HttpError(401, "No autenticado"));
  }
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email, cargo: payload.cargo };
    next();
  } catch {
    next(new HttpError(401, "Sesión inválida o expirada"));
  }
}

export function optionalAuth(req, _res, next) {
  const token = req.cookies?.token;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = { id: payload.sub, email: payload.email, cargo: payload.cargo };
  } catch {
    req.user = null;
  }
  next();
}
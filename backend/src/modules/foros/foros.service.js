import { HttpError } from "../../middlewares/errorHandler.js";
import * as repo from "./foros.repository.js";

function extractUserId(input) {
  if (!input) return null;
  if (typeof input === "number") return input;
  if (typeof input === "object") {
    const nested = input.id_usuario ?? input.id;
    return nested ? Number(nested) : null;
  }
  const n = Number(input);
  return Number.isFinite(n) ? n : null;
}

export async function listForos() {
  return repo.findAll();
}

export async function getForo(id) {
  const foro = await repo.findById(id);
  if (!foro) throw new HttpError(404, "Foro no encontrado");
  return foro;
}

export async function createForo({ nombre_foro, descripcion, id_usuario }) {
  if (!nombre_foro?.trim() || !descripcion?.trim()) {
    throw new HttpError(422, "Nombre y descripción son obligatorios");
  }
  const userId = extractUserId(id_usuario);
  return repo.create({ nombre_foro: nombre_foro.trim(), descripcion: descripcion.trim(), id_usuario: userId });
}

export async function listMensajes(idForo) {
  const foro = await repo.findById(idForo);
  if (!foro) throw new HttpError(404, "Foro no encontrado");
  return repo.findMensajes(idForo);
}

export async function createMensaje(idForo, { contenido, autor, id_usuario }) {
  const foro = await repo.findById(idForo);
  if (!foro) throw new HttpError(404, "Foro no encontrado");
  if (!contenido?.trim()) throw new HttpError(422, "El mensaje no puede estar vacío");
  const userId = extractUserId(id_usuario);
  return repo.createMensaje({ idForo, contenido: contenido.trim(), autor: autor?.trim() || null, id_usuario: userId });
}
import { HttpError } from "../../middlewares/errorHandler.js";
import * as repo from "./articulos.repository.js";

export async function listArticulos() {
  return repo.findAll();
}

export async function getArticulo(id) {
  const articulo = await repo.findById(id);
  if (!articulo) throw new HttpError(404, "Artículo no encontrado");
  return articulo;
}
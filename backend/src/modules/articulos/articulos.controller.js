import * as service from "./articulos.service.js";

export async function list(req, res, next) {
  try {
    const data = await service.listArticulos();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const data = await service.getArticulo(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
import * as service from "./empresas.service.js";

export async function list(req, res, next) {
  try {
    res.json(await service.listEmpresas());
  } catch (err) {
    next(err);
  }
}
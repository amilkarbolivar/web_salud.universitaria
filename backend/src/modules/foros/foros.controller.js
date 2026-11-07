import * as service from "./foros.service.js";

export async function list(req, res, next) {
  try {
    res.json(await service.listForos());
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = await service.createForo(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    res.json(await service.getForo(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function listMessages(req, res, next) {
  try {
    res.json(await service.listMensajes(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function createMessage(req, res, next) {
  try {
    const data = await service.createMensaje(req.params.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}
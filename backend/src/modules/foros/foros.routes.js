import { Router } from "express";
import * as controller from "./foros.controller.js";

const router = Router();
router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.getOne);
router.get("/:id/mensajes", controller.listMessages);
router.post("/:id/mensajes", controller.createMessage);
export default router;
import { Router } from "express";
import * as controller from "./articulos.controller.js";

const router = Router();
router.get("/", controller.list);
router.get("/:id", controller.getOne);
export default router;
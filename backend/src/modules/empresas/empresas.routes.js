import { Router } from "express";
import * as controller from "./empresas.controller.js";

const router = Router();
router.get("/", controller.list);
export default router;
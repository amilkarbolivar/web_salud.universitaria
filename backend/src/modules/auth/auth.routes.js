import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import * as controller from "./auth.controller.js";
import { registerRules, loginRules } from "./auth.validation.js";

const router = Router();

router.post("/register", registerRules, validate, controller.register);
router.post("/login", loginRules, validate, controller.login);
router.post("/logout", controller.logout);
router.get("/me", requireAuth, controller.me);

export default router;
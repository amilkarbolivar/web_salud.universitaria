import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import pinoHttp from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import articulosRoutes from "./modules/articulos/articulos.routes.js";
import forosRoutes from "./modules/foros/foros.routes.js";
import empresasRoutes from "./modules/empresas/empresas.routes.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/v1/auth", authLimiter);

app.use(pinoHttp({ logger }));
app.use(morgan("combined"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "unimental-backend" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/articulos", articulosRoutes);
app.use("/api/v1/foros", forosRoutes);
app.use("/api/v1/empresas", empresasRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
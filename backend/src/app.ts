import express, { Application } from "express";
import cors from "cors";
import { config } from "./config";
import healthRoutes from "./routes/health.routes";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use("/health", healthRoutes);

  // 404
  app.use((_req, res) => res.status(404).json({ message: "Not Found" }));

  return app;
}

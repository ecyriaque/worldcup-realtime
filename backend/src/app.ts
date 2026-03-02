import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./config";
import healthRoutes from "./routes/health.routes";
import competitionRoutes from "./modules/competition/routes";
import phaseRoutes from "./modules/phase/routes";
import groupRoutes from "./modules/group/routes";
import teamRoutes from "./modules/team/routes";
import matchRoutes from "./modules/match/routes";
import standingRoutes from "./modules/standing/routes";

export function createApp(): Application {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    }),
  );
  app.use(express.json());

  // Health check
  app.use("/health", healthRoutes);

  // API routes
  app.use("/api/competitions", competitionRoutes);
  app.use("/api/phases", phaseRoutes);
  app.use("/api/groups", groupRoutes);
  app.use("/api/teams", teamRoutes);
  app.use("/api/matches", matchRoutes);
  app.use("/api/standings", standingRoutes);

  // 404
  app.use((_req, res) => res.status(404).json({ message: "Not Found" }));

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Error:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    if (err.name === "EntityNotFoundError") {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  });

  return app;
}

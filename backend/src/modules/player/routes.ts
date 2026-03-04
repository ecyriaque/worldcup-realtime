import { Router } from "express";
import * as playerController from "./controller";
import { requireApiKey } from "../../middleware/auth";

const router = Router();

// Routes publiques (GET uniquement)
router.get("/", playerController.getAll);
router.get("/search", playerController.searchByName);
router.get("/team/:teamId", playerController.getByTeamId);
router.get("/:id", playerController.getById);

// Routes protégées (API Key requise)
router.post("/", requireApiKey, playerController.create);
router.patch("/:id", requireApiKey, playerController.update);
router.delete("/:id", requireApiKey, playerController.remove);

export default router;

import { Router } from "express";
import * as playerController from "./controller";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();

router.get("/", playerController.getAll);
router.get("/search", playerController.searchByName);
router.get("/team/:teamId", playerController.getByTeamId);
router.get("/:id", playerController.getById);

router.post("/", strictLimiter, requireApiKey, playerController.create);
router.patch("/:id", strictLimiter, requireApiKey, playerController.update);
router.delete("/:id", strictLimiter, requireApiKey, playerController.remove);

export default router;

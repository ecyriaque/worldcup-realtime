import { Router } from "express";
import { MatchEventController } from "./controller";
import { CreateMatchEventDto, UpdateMatchEventDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new MatchEventController();

// Routes publiques (GET uniquement)
router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/match/:matchId", asyncHandler(controller.getByMatch));
router.get("/type/:eventType", asyncHandler(controller.getByType));

// Routes protégées (API Key requise)
router.post(
  "/",
  requireApiKey,
  validateDto(CreateMatchEventDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdateMatchEventDto),
  asyncHandler(controller.update),
);
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

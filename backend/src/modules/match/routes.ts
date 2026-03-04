import { Router } from "express";
import { MatchController } from "./controller";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new MatchController();

// Routes publiques (GET uniquement)
router.get("/", asyncHandler(controller.getAll));
router.get("/live", asyncHandler(controller.getLive));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/status/:status", asyncHandler(controller.getByStatus));

// Routes protégées (API Key requise)
router.post("/", requireApiKey, validateDto(CreateMatchDto), asyncHandler(controller.create));
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdateMatchDto),
  asyncHandler(controller.update),
);
router.patch("/:id/score", requireApiKey, asyncHandler(controller.updateScore));
router.patch("/:id/status", requireApiKey, asyncHandler(controller.updateStatus));
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

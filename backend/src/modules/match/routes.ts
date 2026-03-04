import { Router } from "express";
import { MatchController } from "./controller";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new MatchController();

router.get("/", asyncHandler(controller.getAll));
router.get("/live", asyncHandler(controller.getLive));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/status/:status", asyncHandler(controller.getByStatus));

router.post("/", strictLimiter, requireApiKey, validateDto(CreateMatchDto), asyncHandler(controller.create));
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdateMatchDto),
  asyncHandler(controller.update),
);
router.patch("/:id/score", strictLimiter, requireApiKey, asyncHandler(controller.updateScore));
router.patch("/:id/status", strictLimiter, requireApiKey, asyncHandler(controller.updateStatus));
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

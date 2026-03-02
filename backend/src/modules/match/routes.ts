import { Router } from "express";
import { MatchController } from "./controller";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new MatchController();

router.get("/", asyncHandler(controller.getAll));
router.get("/live", asyncHandler(controller.getLive));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/status/:status", asyncHandler(controller.getByStatus));
router.post("/", validateDto(CreateMatchDto), asyncHandler(controller.create));
router.put(
  "/:id",
  validateDto(UpdateMatchDto),
  asyncHandler(controller.update),
);
router.patch("/:id/score", asyncHandler(controller.updateScore));
router.patch("/:id/status", asyncHandler(controller.updateStatus));
router.delete("/:id", asyncHandler(controller.delete));

export default router;

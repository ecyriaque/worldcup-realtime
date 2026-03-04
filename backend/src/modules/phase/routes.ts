import { Router } from "express";
import { PhaseController } from "./controller";
import { CreatePhaseDto, UpdatePhaseDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new PhaseController();


router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get(
  "/competition/:competitionId",
  asyncHandler(controller.getByCompetition),
);

router.post("/", strictLimiter, requireApiKey, validateDto(CreatePhaseDto), asyncHandler(controller.create));
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdatePhaseDto),
  asyncHandler(controller.update),
);
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

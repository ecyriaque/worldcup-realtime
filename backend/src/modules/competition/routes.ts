import { Router } from "express";
import { CompetitionController } from "./controller";
import { CreateCompetitionDto, UpdateCompetitionDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new CompetitionController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));

router.post(
  "/",
  strictLimiter,
  requireApiKey,
  validateDto(CreateCompetitionDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdateCompetitionDto),
  asyncHandler(controller.update),
);
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

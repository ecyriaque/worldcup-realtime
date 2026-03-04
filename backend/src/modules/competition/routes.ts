import { Router } from "express";
import { CompetitionController } from "./controller";
import { CreateCompetitionDto, UpdateCompetitionDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new CompetitionController();

// Routes publiques (GET uniquement)
router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));

// Routes protégées (API Key requise)
router.post(
  "/",
  requireApiKey,
  validateDto(CreateCompetitionDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdateCompetitionDto),
  asyncHandler(controller.update),
);
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

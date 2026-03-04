import { Router } from "express";
import { PhaseController } from "./controller";
import { CreatePhaseDto, UpdatePhaseDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new PhaseController();

// Routes publiques (GET uniquement)
router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get(
  "/competition/:competitionId",
  asyncHandler(controller.getByCompetition),
);

// Routes protégées (API Key requise)
router.post("/", requireApiKey, validateDto(CreatePhaseDto), asyncHandler(controller.create));
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdatePhaseDto),
  asyncHandler(controller.update),
);
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

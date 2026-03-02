import { Router } from "express";
import { PhaseController } from "./controller";
import { CreatePhaseDto, UpdatePhaseDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new PhaseController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get(
  "/competition/:competitionId",
  asyncHandler(controller.getByCompetition),
);
router.post("/", validateDto(CreatePhaseDto), asyncHandler(controller.create));
router.put(
  "/:id",
  validateDto(UpdatePhaseDto),
  asyncHandler(controller.update),
);
router.delete("/:id", asyncHandler(controller.delete));

export default router;

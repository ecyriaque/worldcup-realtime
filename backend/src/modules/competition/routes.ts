import { Router } from "express";
import { CompetitionController } from "./controller";
import { CreateCompetitionDto, UpdateCompetitionDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new CompetitionController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.post("/", validateDto(CreateCompetitionDto), asyncHandler(controller.create));
router.put("/:id", validateDto(UpdateCompetitionDto), asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.delete));

export default router;

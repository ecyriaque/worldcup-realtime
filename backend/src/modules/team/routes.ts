import { Router } from "express";
import { TeamController } from "./controller";
import { CreateTeamDto, UpdateTeamDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new TeamController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/code/:code", asyncHandler(controller.getByCode));
router.post("/", validateDto(CreateTeamDto), asyncHandler(controller.create));
router.put("/:id", validateDto(UpdateTeamDto), asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.delete));

export default router;

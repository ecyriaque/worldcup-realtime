import { Router } from "express";
import { TeamController } from "./controller";
import { CreateTeamDto, UpdateTeamDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new TeamController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/code/:code", asyncHandler(controller.getByCode));


router.post("/", strictLimiter, requireApiKey, validateDto(CreateTeamDto), asyncHandler(controller.create));
router.put("/:id", strictLimiter, requireApiKey, validateDto(UpdateTeamDto), asyncHandler(controller.update));
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

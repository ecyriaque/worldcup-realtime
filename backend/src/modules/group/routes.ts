import { Router } from "express";
import { GroupController } from "./controller";
import { CreateGroupDto, UpdateGroupDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new GroupController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));

router.post("/", strictLimiter, requireApiKey, validateDto(CreateGroupDto), asyncHandler(controller.create));
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdateGroupDto),
  asyncHandler(controller.update),
);
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

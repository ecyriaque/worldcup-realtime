import { Router } from "express";
import { GroupController } from "./controller";
import { CreateGroupDto, UpdateGroupDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new GroupController();

// Routes publiques (GET uniquement)
router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));

// Routes protégées (API Key requise)
router.post("/", requireApiKey, validateDto(CreateGroupDto), asyncHandler(controller.create));
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdateGroupDto),
  asyncHandler(controller.update),
);
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

import { Router } from "express";
import { GroupController } from "./controller";
import { CreateGroupDto, UpdateGroupDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new GroupController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/phase/:phaseId", asyncHandler(controller.getByPhase));
router.post("/", validateDto(CreateGroupDto), asyncHandler(controller.create));
router.put(
  "/:id",
  validateDto(UpdateGroupDto),
  asyncHandler(controller.update),
);
router.delete("/:id", asyncHandler(controller.delete));

export default router;

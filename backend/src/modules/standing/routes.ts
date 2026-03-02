import { Router } from "express";
import { GroupStandingController } from "./controller";
import { CreateGroupStandingDto, UpdateGroupStandingDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new GroupStandingController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/team/:teamId", asyncHandler(controller.getByTeam));
router.post(
  "/",
  validateDto(CreateGroupStandingDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  validateDto(UpdateGroupStandingDto),
  asyncHandler(controller.update),
);
router.delete("/:id", asyncHandler(controller.delete));

export default router;

import { Router } from "express";
import { GroupStandingController } from "./controller";
import { CreateGroupStandingDto, UpdateGroupStandingDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";

const router = Router();
const controller = new GroupStandingController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/team/:teamId", asyncHandler(controller.getByTeam));


router.post(
  "/group/:groupId/update",
  requireApiKey,
  asyncHandler(controller.updateGroupStandings),
);
router.post(
  "/",
  requireApiKey,
  validateDto(CreateGroupStandingDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  requireApiKey,
  validateDto(UpdateGroupStandingDto),
  asyncHandler(controller.update),
);
router.delete("/:id", requireApiKey, asyncHandler(controller.delete));

export default router;

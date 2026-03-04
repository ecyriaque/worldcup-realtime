import { Router } from "express";
import { GroupStandingController } from "./controller";
import { CreateGroupStandingDto, UpdateGroupStandingDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new GroupStandingController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/group/:groupId", asyncHandler(controller.getByGroup));
router.get("/team/:teamId", asyncHandler(controller.getByTeam));


router.post(
  "/group/:groupId/update",
  strictLimiter,
  requireApiKey,
  asyncHandler(controller.updateGroupStandings),
);
router.post(
  "/",
  strictLimiter,
  requireApiKey,
  validateDto(CreateGroupStandingDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdateGroupStandingDto),
  asyncHandler(controller.update),
);
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

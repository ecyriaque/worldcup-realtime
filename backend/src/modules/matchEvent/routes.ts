import { Router } from "express";
import { MatchEventController } from "./controller";
import { CreateMatchEventDto, UpdateMatchEventDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";
import { requireApiKey } from "../../middleware/auth";
import { strictLimiter } from "../../middleware/security";

const router = Router();
const controller = new MatchEventController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/match/:matchId", asyncHandler(controller.getByMatch));
router.get("/type/:eventType", asyncHandler(controller.getByType));


router.post(
  "/",
  strictLimiter,
  requireApiKey,
  validateDto(CreateMatchEventDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  strictLimiter,
  requireApiKey,
  validateDto(UpdateMatchEventDto),
  asyncHandler(controller.update),
);
router.delete("/:id", strictLimiter, requireApiKey, asyncHandler(controller.delete));

export default router;

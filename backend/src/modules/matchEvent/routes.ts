import { Router } from "express";
import { MatchEventController } from "./controller";
import { CreateMatchEventDto, UpdateMatchEventDto } from "./dto";
import { validateDto, asyncHandler } from "../../utils/validation";

const router = Router();
const controller = new MatchEventController();

router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getOne));
router.get("/match/:matchId", asyncHandler(controller.getByMatch));
router.get("/type/:eventType", asyncHandler(controller.getByType));
router.post(
  "/",
  validateDto(CreateMatchEventDto),
  asyncHandler(controller.create),
);
router.put(
  "/:id",
  validateDto(UpdateMatchEventDto),
  asyncHandler(controller.update),
);
router.delete("/:id", asyncHandler(controller.delete));

export default router;

import { Router } from "express";
import * as playerController from "./controller";

const router = Router();

// Get all players
router.get("/", playerController.getAll);

// Search players by name
router.get("/search", playerController.searchByName);

// Get players by team
router.get("/team/:teamId", playerController.getByTeamId);

// Get a specific player
router.get("/:id", playerController.getById);

// Create a new player
router.post("/", playerController.create);

// Update a player
router.patch("/:id", playerController.update);

// Delete a player
router.delete("/:id", playerController.remove);

export default router;

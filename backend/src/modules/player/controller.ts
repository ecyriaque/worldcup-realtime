import { Request, Response } from "express";
import { playerService } from "./service";
import { CreatePlayerDto, UpdatePlayerDto } from "./dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

/**
 * Get all players
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const players = await playerService.getAll();
    return res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get a player by ID
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const player = await playerService.getById(id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get players by team ID
 */
export const getByTeamId = async (req: Request, res: Response) => {
  try {
    const teamIdParam = req.params.teamId;
    if (!teamIdParam || Array.isArray(teamIdParam)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const teamId = parseInt(teamIdParam);
    if (isNaN(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    
    const players = await playerService.getByTeamId(teamId);
    return res.json(players);
  } catch (error) {
    console.error("Error fetching players by team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create a new player
 */
export const create = async (req: Request, res: Response) => {
  try {
    const dto = plainToInstance(CreatePlayerDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const player = await playerService.create(dto);
    return res.status(201).json(player);
  } catch (error: any) {
    console.error("Error creating player:", error);
    
    // Handle unique constraint violation
    if (error.code === "23505") {
      return res.status(409).json({ message: "Jersey number already exists for this team" });
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update a player
 */
export const update = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const dto = plainToInstance(UpdatePlayerDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const player = await playerService.update(id, dto);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.json(player);
  } catch (error: any) {
    console.error("Error updating player:", error);
    
    // Handle unique constraint violation
    if (error.code === "23505") {
      return res.status(409).json({ message: "Jersey number already exists for this team" });
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a player
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    
    const deleted = await playerService.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting player:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Search players by name
 */
export const searchByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    
    if (!name || typeof name !== "string" || Array.isArray(name)) {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    const players = await playerService.searchByName(name);
    return res.json(players);
  } catch (error) {
    console.error("Error searching players:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

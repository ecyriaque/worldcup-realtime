import { Request, Response } from "express";
import { GroupStandingService } from "./service";

export class GroupStandingController {
  private service: GroupStandingService;

  constructor() {
    this.service = new GroupStandingService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const standings = await this.service.getAllStandings();
    res.json(standings);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const standing = await this.service.getStandingById(id);
    res.json(standing);
  };

  getByGroup = async (req: Request, res: Response): Promise<void> => {
    const groupId = parseInt(req.params.groupId as string);
    const standings = await this.service.getStandingsByGroup(groupId);
    res.json(standings);
  };

  getByTeam = async (req: Request, res: Response): Promise<void> => {
    const teamId = parseInt(req.params.teamId as string);
    const standings = await this.service.getStandingsByTeam(teamId);
    res.json(standings);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const standing = await this.service.createStanding(req.body);
    res.status(201).json(standing);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const standing = await this.service.updateStanding(id, req.body);
    res.json(standing);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteStanding(id);
    res.status(204).send();
  };
}

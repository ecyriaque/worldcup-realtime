import { Request, Response } from "express";
import { TeamService } from "./service";

export class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.service.getAllTeams();
    res.json(teams);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const team = await this.service.getTeamById(id);
    res.json(team);
  };

  getByCode = async (req: Request, res: Response): Promise<void> => {
    const code = req.params.code as string;
    const team = await this.service.getTeamByCode(code);
    res.json(team);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const team = await this.service.createTeam(req.body);
    res.status(201).json(team);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const team = await this.service.updateTeam(id, req.body);
    res.json(team);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteTeam(id);
    res.status(204).send();
  };
}

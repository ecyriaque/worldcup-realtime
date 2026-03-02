import { Request, Response } from "express";
import { CompetitionService } from "./service";

export class CompetitionController {
  private service: CompetitionService;

  constructor() {
    this.service = new CompetitionService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const competitions = await this.service.getAllCompetitions();
    res.json(competitions);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const competition = await this.service.getCompetitionById(id);
    res.json(competition);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const competition = await this.service.createCompetition(req.body);
    res.status(201).json(competition);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const competition = await this.service.updateCompetition(id, req.body);
    res.json(competition);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteCompetition(id);
    res.status(204).send();
  };
}

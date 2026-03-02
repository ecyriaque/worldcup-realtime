import { Request, Response } from "express";
import { PhaseService } from "./service";

export class PhaseController {
  private service: PhaseService;

  constructor() {
    this.service = new PhaseService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const phases = await this.service.getAllPhases();
    res.json(phases);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const phase = await this.service.getPhaseById(id);
    res.json(phase);
  };

  getByCompetition = async (req: Request, res: Response): Promise<void> => {
    const competitionId = parseInt(req.params.competitionId as string);
    const phases = await this.service.getPhasesByCompetition(competitionId);
    res.json(phases);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const phase = await this.service.createPhase(req.body);
    res.status(201).json(phase);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const phase = await this.service.updatePhase(id, req.body);
    res.json(phase);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deletePhase(id);
    res.status(204).send();
  };
}

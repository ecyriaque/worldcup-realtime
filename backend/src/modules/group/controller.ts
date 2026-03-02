import { Request, Response } from "express";
import { GroupService } from "./service";

export class GroupController {
  private service: GroupService;

  constructor() {
    this.service = new GroupService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const groups = await this.service.getAllGroups();
    res.json(groups);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const group = await this.service.getGroupById(id);
    res.json(group);
  };

  getByPhase = async (req: Request, res: Response): Promise<void> => {
    const phaseId = parseInt(req.params.phaseId as string);
    const groups = await this.service.getGroupsByPhase(phaseId);
    res.json(groups);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const group = await this.service.createGroup(req.body);
    res.status(201).json(group);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const group = await this.service.updateGroup(id, req.body);
    res.json(group);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteGroup(id);
    res.status(204).send();
  };
}

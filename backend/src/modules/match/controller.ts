import { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { MatchService } from "./service";
import { MatchStatus } from "../../types/enums";
import { emitMatchUpdate } from "../../websocket/socket";

export class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const matches = await this.service.getAllMatches();
    res.json(matches);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const match = await this.service.getMatchById(id);
    res.json(match);
  };

  getByPhase = async (req: Request, res: Response): Promise<void> => {
    const phaseId = parseInt(req.params.phaseId as string);
    const matches = await this.service.getMatchesByPhase(phaseId);
    res.json(matches);
  };

  getByGroup = async (req: Request, res: Response): Promise<void> => {
    const groupId = parseInt(req.params.groupId as string);
    const matches = await this.service.getMatchesByGroup(groupId);
    res.json(matches);
  };

  getLive = async (_req: Request, res: Response): Promise<void> => {
    const matches = await this.service.getLiveMatches();
    res.json(matches);
  };

  getByStatus = async (req: Request, res: Response): Promise<void> => {
    const status = req.params.status as MatchStatus;
    const matches = await this.service.getMatchesByStatus(status);
    res.json(matches);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const match = await this.service.createMatch(req.body);
    res.status(201).json(match);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const match = await this.service.updateMatch(id, req.body);

    // Émettre l'événement WebSocket pour les mises à jour en temps réel
    const io = req.app.get("io") as SocketIOServer | undefined;
    if (io) {
      emitMatchUpdate(io, {
        matchId: match.matchId,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
      });
    }

    res.json(match);
  };

  updateScore = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const { homeScore, awayScore } = req.body;
    const match = await this.service.updateMatchScore(id, homeScore, awayScore);

    const io = req.app.get("io") as SocketIOServer | undefined;
    if (io) {
      emitMatchUpdate(io, {
        matchId: match.matchId,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
      });
    }

    res.json(match);
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const { status } = req.body;
    const match = await this.service.updateMatchStatus(id, status);

    const io = req.app.get("io") as SocketIOServer | undefined;
    if (io) {
      emitMatchUpdate(io, {
        matchId: match.matchId,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
      });
    }

    res.json(match);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteMatch(id);
    res.status(204).send();
  };
}

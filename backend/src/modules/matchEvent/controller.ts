import { Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { MatchEventService } from "./service";
import { MatchEventType } from "../../types/enums";
import { emitMatchEventUpdate } from "../../websocket/socket";

export class MatchEventController {
  private service: MatchEventService;

  constructor() {
    this.service = new MatchEventService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const events = await this.service.getAllEvents();
    res.json(events);
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const event = await this.service.getEventById(id);
    res.json(event);
  };

  getByMatch = async (req: Request, res: Response): Promise<void> => {
    const matchId = parseInt(req.params.matchId as string);
    const events = await this.service.getEventsByMatch(matchId);
    res.json(events);
  };

  getByType = async (req: Request, res: Response): Promise<void> => {
    const eventType = req.params.eventType as MatchEventType;
    const events = await this.service.getEventsByType(eventType);
    res.json(events);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const event = await this.service.createEvent(req.body);

    // Emit WebSocket event for real-time updates
    const io = req.app.get("io") as SocketIOServer | undefined;
    if (io) {
      const payload = {
        eventId: event.eventId,
        matchId: event.matchId,
        teamId: event.teamId,
        playerId: event.playerId,
        playerName: event.player ? `${event.player.firstName} ${event.player.lastName}` : undefined,
        eventType: event.eventType,
        minute: event.minute,
        extraInfo: event.extraInfo,
      };
      emitMatchEventUpdate(io, payload);
    }

    res.status(201).json(event);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const event = await this.service.updateEvent(id, req.body);

    // Emit WebSocket event for real-time updates
    const io = req.app.get("io") as SocketIOServer | undefined;
    if (io) {
      const payload = {
        eventId: event.eventId,
        matchId: event.matchId,
        teamId: event.teamId,
        playerId: event.playerId,
        playerName: event.player ? `${event.player.firstName} ${event.player.lastName}` : undefined,
        eventType: event.eventType,
        minute: event.minute,
        extraInfo: event.extraInfo,
      };
      emitMatchEventUpdate(io, payload);
    }

    res.json(event);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await this.service.deleteEvent(id);
    res.status(204).send();
  };
}

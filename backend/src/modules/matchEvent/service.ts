import { MatchEventRepository } from "./repository";
import { MatchEvent } from "./entity";
import { CreateMatchEventDto, UpdateMatchEventDto } from "./dto";
import { MatchEventType } from "../../types/enums";

export class MatchEventService {
  private repository: MatchEventRepository;

  constructor() {
    this.repository = new MatchEventRepository();
  }

  async getAllEvents(): Promise<MatchEvent[]> {
    return this.repository.findAll();
  }

  async getEventById(id: number): Promise<MatchEvent> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }

  async getEventsByMatch(matchId: number): Promise<MatchEvent[]> {
    return this.repository.findByMatch(matchId);
  }

  async getEventsByType(eventType: MatchEventType): Promise<MatchEvent[]> {
    return this.repository.findByType(eventType);
  }

  async createEvent(dto: CreateMatchEventDto): Promise<MatchEvent> {
    return this.repository.create(dto);
  }

  async updateEvent(id: number, dto: UpdateMatchEventDto): Promise<MatchEvent> {
    const event = await this.repository.update(id, dto);
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }

  async deleteEvent(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Event with ID ${id} not found`);
    }
  }

  async deleteEventsByMatch(matchId: number): Promise<void> {
    await this.repository.deleteByMatch(matchId);
  }
}

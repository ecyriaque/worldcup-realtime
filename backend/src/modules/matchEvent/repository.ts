import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { MatchEvent } from "./entity";
import { MatchEventType } from "../../types/enums";

export class MatchEventRepository {
  private repository: Repository<MatchEvent>;

  constructor() {
    this.repository = AppDataSource.getRepository(MatchEvent);
  }

  async findAll(): Promise<MatchEvent[]> {
    return this.repository.find({
      relations: ["match", "team", "player"],
      order: { minute: "ASC" },
    });
  }

  async findById(id: number): Promise<MatchEvent | null> {
    return this.repository.findOne({
      where: { eventId: id },
      relations: ["match", "match.homeTeam", "match.awayTeam", "team", "player"],
    });
  }

  async findByMatch(matchId: number): Promise<MatchEvent[]> {
    return this.repository.find({
      where: { matchId },
      relations: ["team", "player"],
      order: { minute: "ASC" },
    });
  }

  async findByType(eventType: MatchEventType): Promise<MatchEvent[]> {
    return this.repository.find({
      where: { eventType },
      relations: ["match", "team", "player"],
      order: { minute: "ASC" },
    });
  }

  async create(data: Partial<MatchEvent>): Promise<MatchEvent> {
    const event = this.repository.create(data);
    const savedEvent = await this.repository.save(event);
    // Reload with relations for WebSocket payload
    return this.findById(savedEvent.eventId) as Promise<MatchEvent>;
  }

  async update(
    id: number,
    data: Partial<MatchEvent>,
  ): Promise<MatchEvent | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async deleteByMatch(matchId: number): Promise<boolean> {
    const result = await this.repository.delete({ matchId });
    return (result.affected ?? 0) > 0;
  }
}

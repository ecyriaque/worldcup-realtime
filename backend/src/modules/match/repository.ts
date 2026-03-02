import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Match } from "./entity";
import { MatchStatus } from "../../types/enums";

export class MatchRepository {
  private repository: Repository<Match>;

  constructor() {
    this.repository = AppDataSource.getRepository(Match);
  }

  async findAll(): Promise<Match[]> {
    return this.repository.find({
      relations: ["phase", "group", "homeTeam", "awayTeam"],
      order: { matchDatetime: "ASC" },
    });
  }

  async findById(id: number): Promise<Match | null> {
    return this.repository.findOne({
      where: { matchId: id },
      relations: ["phase", "group", "homeTeam", "awayTeam"],
    });
  }

  async findByPhase(phaseId: number): Promise<Match[]> {
    return this.repository.find({
      where: { phaseId },
      relations: ["group", "homeTeam", "awayTeam"],
      order: { matchDatetime: "ASC" },
    });
  }

  async findByGroup(groupId: number): Promise<Match[]> {
    return this.repository.find({
      where: { groupId },
      relations: ["homeTeam", "awayTeam"],
      order: { matchDatetime: "ASC" },
    });
  }

  async findByStatus(status: MatchStatus): Promise<Match[]> {
    return this.repository.find({
      where: { status },
      relations: ["phase", "group", "homeTeam", "awayTeam"],
      order: { matchDatetime: "ASC" },
    });
  }

  async findLiveMatches(): Promise<Match[]> {
    return this.findByStatus(MatchStatus.LIVE);
  }

  async create(data: Partial<Match>): Promise<Match> {
    const match = this.repository.create(data);
    return this.repository.save(match);
  }

  async update(id: number, data: Partial<Match>): Promise<Match | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

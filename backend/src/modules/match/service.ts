import { MatchRepository } from "./repository";
import { Match } from "./entity";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { MatchStatus } from "../../types/enums";

export class MatchService {
  private repository: MatchRepository;

  constructor() {
    this.repository = new MatchRepository();
  }

  async getAllMatches(): Promise<Match[]> {
    return this.repository.findAll();
  }

  async getMatchById(id: number): Promise<Match> {
    const match = await this.repository.findById(id);
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }
    return match;
  }

  async getMatchesByPhase(phaseId: number): Promise<Match[]> {
    return this.repository.findByPhase(phaseId);
  }

  async getMatchesByGroup(groupId: number): Promise<Match[]> {
    return this.repository.findByGroup(groupId);
  }

  async getMatchesByStatus(status: MatchStatus): Promise<Match[]> {
    return this.repository.findByStatus(status);
  }

  async getLiveMatches(): Promise<Match[]> {
    return this.repository.findLiveMatches();
  }

  async createMatch(dto: CreateMatchDto): Promise<Match> {
    // Validate teams are different
    if (dto.homeTeamId === dto.awayTeamId) {
      throw new Error("Home team and away team must be different");
    }

    return this.repository.create(dto);
  }

  async updateMatch(id: number, dto: UpdateMatchDto): Promise<Match> {
    // Validate teams are different if both are provided
    if (dto.homeTeamId && dto.awayTeamId && dto.homeTeamId === dto.awayTeamId) {
      throw new Error("Home team and away team must be different");
    }

    const match = await this.repository.update(id, dto);
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }
    return match;
  }

  async updateMatchScore(
    id: number,
    homeScore: number,
    awayScore: number
  ): Promise<Match> {
    return this.updateMatch(id, { homeScore, awayScore });
  }

  async updateMatchStatus(id: number, status: MatchStatus): Promise<Match> {
    return this.updateMatch(id, { status });
  }

  async deleteMatch(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Match with ID ${id} not found`);
    }
  }
}

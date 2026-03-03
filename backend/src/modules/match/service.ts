import { MatchRepository } from "./repository";
import { Match } from "./entity";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { MatchStatus } from "../../types/enums";
import { GroupStandingService } from "../standing/service";

export class MatchService {
  private repository: MatchRepository;
  private standingService: GroupStandingService;

  constructor() {
    this.repository = new MatchRepository();
    this.standingService = new GroupStandingService();
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

    // Récupérer le match avant la mise à jour pour comparer
    const oldMatch = await this.repository.findById(id);
    if (!oldMatch) {
      throw new Error(`Match with ID ${id} not found`);
    }

    const match = await this.repository.update(id, dto);
    if (!match) {
      throw new Error(`Match with ID ${id} not found`);
    }

    // Si le match est dans un groupe et que le statut est FINISHED ou que les scores ont changé
    if (match.groupId) {
      const shouldUpdateStandings =
        match.status === MatchStatus.FINISHED &&
        (oldMatch.status !== MatchStatus.FINISHED ||
          oldMatch.homeScore !== match.homeScore ||
          oldMatch.awayScore !== match.awayScore);

      if (shouldUpdateStandings) {
        // Mettre à jour les standings du groupe de manière asynchrone
        this.standingService
          .updateGroupStandings(match.groupId)
          .catch((err) => {
            console.error(
              `Error updating standings for group ${match.groupId}:`,
              err,
            );
          });
      }
    }

    return match;
  }

  async updateMatchScore(
    id: number,
    homeScore: number,
    awayScore: number,
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

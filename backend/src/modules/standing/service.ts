import { GroupStandingRepository } from "./repository";
import { GroupStanding } from "./entity";
import { CreateGroupStandingDto, UpdateGroupStandingDto } from "./dto";
import { MatchRepository } from "../match/repository";
import { MatchStatus } from "../../types/enums";

export class GroupStandingService {
  private repository: GroupStandingRepository;
  private matchRepository: MatchRepository;

  constructor() {
    this.repository = new GroupStandingRepository();
    this.matchRepository = new MatchRepository();
  }

  async getAllStandings(): Promise<GroupStanding[]> {
    return this.repository.findAll();
  }

  async getStandingById(id: number): Promise<GroupStanding> {
    const standing = await this.repository.findById(id);
    if (!standing) {
      throw new Error(`Standing with ID ${id} not found`);
    }
    return standing;
  }

  async getStandingsByGroup(groupId: number): Promise<GroupStanding[]> {
    return this.repository.findByGroup(groupId);
  }

  async getStandingsByTeam(teamId: number): Promise<GroupStanding[]> {
    return this.repository.findByTeam(teamId);
  }

  async createStanding(dto: CreateGroupStandingDto): Promise<GroupStanding> {
    // Calculate goal difference
    const goalsFor = dto.goalsFor ?? 0;
    const goalsAgainst = dto.goalsAgainst ?? 0;
    const goalDifference = goalsFor - goalsAgainst;

    return this.repository.create({
      ...dto,
      goalDifference,
    });
  }

  async updateStanding(
    id: number,
    dto: UpdateGroupStandingDto,
  ): Promise<GroupStanding> {
    // Recalculate goal difference if goals changed
    if (dto.goalsFor !== undefined || dto.goalsAgainst !== undefined) {
      const current = await this.repository.findById(id);
      if (current) {
        const goalsFor = dto.goalsFor ?? current.goalsFor;
        const goalsAgainst = dto.goalsAgainst ?? current.goalsAgainst;
        dto.goalDifference = goalsFor - goalsAgainst;
      }
    }

    const standing = await this.repository.update(id, dto);
    if (!standing) {
      throw new Error(`Standing with ID ${id} not found`);
    }
    return standing;
  }

  async deleteStanding(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Standing with ID ${id} not found`);
    }
  }

  /**
   * Recalcule les standings d'un groupe à partir des résultats des matchs terminés
   */
  async updateGroupStandings(groupId: number): Promise<GroupStanding[]> {
    // Récupérer tous les matchs terminés du groupe
    const matches = await this.matchRepository.findByGroup(groupId);
    const finishedMatches = matches.filter((m) => m.status === MatchStatus.FINISHED);

    // Initialiser les stats pour chaque équipe
    const teamStats = new Map<
      number,
      {
        teamId: number;
        played: number;
        wins: number;
        draw: number;
        losses: number;
        goalsFor: number;
        goalsAgainst: number;
        goalDifference: number;
        points: number;
      }
    >();

    // Parcourir tous les matchs terminés pour calculer les stats
    for (const match of finishedMatches) {
      // Initialiser les stats si nécessaire
      if (!teamStats.has(match.homeTeamId)) {
        teamStats.set(match.homeTeamId, {
          teamId: match.homeTeamId,
          played: 0,
          wins: 0,
          draw: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        });
      }
      if (!teamStats.has(match.awayTeamId)) {
        teamStats.set(match.awayTeamId, {
          teamId: match.awayTeamId,
          played: 0,
          wins: 0,
          draw: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        });
      }

      const homeStats = teamStats.get(match.homeTeamId)!;
      const awayStats = teamStats.get(match.awayTeamId)!;

      // Mettre à jour les matchs joués
      homeStats.played++;
      awayStats.played++;

      // Mettre à jour les buts
      homeStats.goalsFor += match.homeScore;
      homeStats.goalsAgainst += match.awayScore;
      awayStats.goalsFor += match.awayScore;
      awayStats.goalsAgainst += match.homeScore;

      // Déterminer le résultat et mettre à jour les stats
      if (match.homeScore > match.awayScore) {
        // Victoire de l'équipe à domicile
        homeStats.wins++;
        homeStats.points += 3;
        awayStats.losses++;
      } else if (match.homeScore < match.awayScore) {
        // Victoire de l'équipe à l'extérieur
        awayStats.wins++;
        awayStats.points += 3;
        homeStats.losses++;
      } else {
        // Match nul
        homeStats.draw++;
        homeStats.points += 1;
        awayStats.draw++;
        awayStats.points += 1;
      }

      // Calculer la différence de buts
      homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst;
      awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst;
    }

    // Mettre à jour ou créer les standings dans la base de données
    const standings: GroupStanding[] = [];
    for (const stats of teamStats.values()) {
      const standing = await this.repository.upsert({
        groupId,
        teamId: stats.teamId,
        played: stats.played,
        wins: stats.wins,
        draw: stats.draw,
        losses: stats.losses,
        goalsFor: stats.goalsFor,
        goalsAgainst: stats.goalsAgainst,
        goalDifference: stats.goalDifference,
        points: stats.points,
      });
      standings.push(standing);
    }

    // Retourner les standings triés
    return standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference)
        return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }
}

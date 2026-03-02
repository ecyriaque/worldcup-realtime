import { TeamRepository } from "./repository";
import { Team } from "./entity";
import { CreateTeamDto, UpdateTeamDto } from "./dto";

export class TeamService {
  private repository: TeamRepository;

  constructor() {
    this.repository = new TeamRepository();
  }

  async getAllTeams(): Promise<Team[]> {
    return this.repository.findAll();
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.repository.findById(id);
    if (!team) {
      throw new Error(`Team with ID ${id} not found`);
    }
    return team;
  }

  async getTeamByCode(code: string): Promise<Team> {
    const team = await this.repository.findByCode(code);
    if (!team) {
      throw new Error(`Team with code ${code} not found`);
    }
    return team;
  }

  async createTeam(dto: CreateTeamDto): Promise<Team> {
    // Check if code already exists
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      throw new Error(`Team with code ${dto.code} already exists`);
    }
    return this.repository.create(dto);
  }

  async updateTeam(id: number, dto: UpdateTeamDto): Promise<Team> {
    // Check if code conflicts with existing team
    if (dto.code) {
      const existing = await this.repository.findByCode(dto.code);
      if (existing && existing.teamId !== id) {
        throw new Error(`Team with code ${dto.code} already exists`);
      }
    }

    const team = await this.repository.update(id, dto);
    if (!team) {
      throw new Error(`Team with ID ${id} not found`);
    }
    return team;
  }

  async deleteTeam(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Team with ID ${id} not found`);
    }
  }
}

import { GroupStandingRepository } from "./repository";
import { GroupStanding } from "./entity";
import { CreateGroupStandingDto, UpdateGroupStandingDto } from "./dto";

export class GroupStandingService {
  private repository: GroupStandingRepository;

  constructor() {
    this.repository = new GroupStandingRepository();
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
}

import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { GroupStanding } from "./entity";

export class GroupStandingRepository {
  private repository: Repository<GroupStanding>;

  constructor() {
    this.repository = AppDataSource.getRepository(GroupStanding);
  }

  async findAll(): Promise<GroupStanding[]> {
    return this.repository.find({
      relations: ["group", "team"],
      order: { points: "DESC", goalDifference: "DESC" },
    });
  }

  async findById(id: number): Promise<GroupStanding | null> {
    return this.repository.findOne({
      where: { standingId: id },
      relations: ["group", "team"],
    });
  }

  async findByGroup(groupId: number): Promise<GroupStanding[]> {
    return this.repository.find({
      where: { groupId },
      relations: ["team"],
      order: { points: "DESC", goalDifference: "DESC", goalsFor: "DESC" },
    });
  }

  async findByTeam(teamId: number): Promise<GroupStanding[]> {
    return this.repository.find({
      where: { teamId },
      relations: ["group"],
    });
  }

  async create(data: Partial<GroupStanding>): Promise<GroupStanding> {
    const standing = this.repository.create(data);
    return this.repository.save(standing);
  }

  async update(
    id: number,
    data: Partial<GroupStanding>
  ): Promise<GroupStanding | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

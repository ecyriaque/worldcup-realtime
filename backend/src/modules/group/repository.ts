import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Group } from "./entity";

export class GroupRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = AppDataSource.getRepository(Group);
  }

  async findAll(): Promise<Group[]> {
    return this.repository.find({
      relations: ["phase", "matches", "standings"],
    });
  }

  async findById(id: number): Promise<Group | null> {
    return this.repository.findOne({
      where: { groupId: id },
      relations: ["phase", "matches", "standings", "standings.team"],
    });
  }

  async findByPhase(phaseId: number): Promise<Group[]> {
    return this.repository.find({
      where: { phaseId },
      relations: ["standings", "standings.team"],
    });
  }

  async create(data: Partial<Group>): Promise<Group> {
    const group = this.repository.create(data);
    return this.repository.save(group);
  }

  async update(id: number, data: Partial<Group>): Promise<Group | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

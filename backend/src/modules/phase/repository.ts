import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Phase } from "./entity";

export class PhaseRepository {
  private repository: Repository<Phase>;

  constructor() {
    this.repository = AppDataSource.getRepository(Phase);
  }

  async findAll(): Promise<Phase[]> {
    return this.repository.find({
      relations: ["competition", "groups", "matches"],
    });
  }

  async findById(id: number): Promise<Phase | null> {
    return this.repository.findOne({
      where: { phaseId: id },
      relations: ["competition", "groups", "matches"],
    });
  }

  async findByCompetition(competitionId: number): Promise<Phase[]> {
    return this.repository.find({
      where: { competitionId },
      relations: ["groups", "matches"],
      order: { displayOrder: "ASC" },
    });
  }

  async create(data: Partial<Phase>): Promise<Phase> {
    const phase = this.repository.create(data);
    return this.repository.save(phase);
  }

  async update(id: number, data: Partial<Phase>): Promise<Phase | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

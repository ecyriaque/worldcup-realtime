import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Competition } from "./entity";

export class CompetitionRepository {
  private repository: Repository<Competition>;

  constructor() {
    this.repository = AppDataSource.getRepository(Competition);
  }

  async findAll(): Promise<Competition[]> {
    return this.repository.find({ relations: ["phases"] });
  }

  async findById(id: number): Promise<Competition | null> {
    return this.repository.findOne({
      where: { competitionId: id },
      relations: ["phases"],
    });
  }

  async create(data: Partial<Competition>): Promise<Competition> {
    const competition = this.repository.create(data);
    return this.repository.save(competition);
  }

  async update(
    id: number,
    data: Partial<Competition>,
  ): Promise<Competition | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

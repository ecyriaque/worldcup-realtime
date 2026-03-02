import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import { Team } from "./entity";

export class TeamRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = AppDataSource.getRepository(Team);
  }

  async findAll(): Promise<Team[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Team | null> {
    return this.repository.findOne({
      where: { teamId: id },
      relations: ["standings", "standings.group"],
    });
  }

  async findByCode(code: string): Promise<Team | null> {
    return this.repository.findOne({ where: { code } });
  }

  async create(data: Partial<Team>): Promise<Team> {
    const team = this.repository.create(data);
    return this.repository.save(team);
  }

  async update(id: number, data: Partial<Team>): Promise<Team | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

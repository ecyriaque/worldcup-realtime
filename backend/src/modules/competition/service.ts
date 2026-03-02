import { CompetitionRepository } from "./repository";
import { Competition } from "./entity";
import { CreateCompetitionDto, UpdateCompetitionDto } from "./dto";

export class CompetitionService {
  private repository: CompetitionRepository;

  constructor() {
    this.repository = new CompetitionRepository();
  }

  async getAllCompetitions(): Promise<Competition[]> {
    return this.repository.findAll();
  }

  async getCompetitionById(id: number): Promise<Competition> {
    const competition = await this.repository.findById(id);
    if (!competition) {
      throw new Error(`Competition with ID ${id} not found`);
    }
    return competition;
  }

  async createCompetition(dto: CreateCompetitionDto): Promise<Competition> {
    return this.repository.create(dto);
  }

  async updateCompetition(
    id: number,
    dto: UpdateCompetitionDto,
  ): Promise<Competition> {
    const competition = await this.repository.update(id, dto);
    if (!competition) {
      throw new Error(`Competition with ID ${id} not found`);
    }
    return competition;
  }

  async deleteCompetition(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Competition with ID ${id} not found`);
    }
  }
}

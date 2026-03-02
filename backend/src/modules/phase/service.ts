import { PhaseRepository } from "./repository";
import { Phase } from "./entity";
import { CreatePhaseDto, UpdatePhaseDto } from "./dto";

export class PhaseService {
  private repository: PhaseRepository;

  constructor() {
    this.repository = new PhaseRepository();
  }

  async getAllPhases(): Promise<Phase[]> {
    return this.repository.findAll();
  }

  async getPhaseById(id: number): Promise<Phase> {
    const phase = await this.repository.findById(id);
    if (!phase) {
      throw new Error(`Phase with ID ${id} not found`);
    }
    return phase;
  }

  async getPhasesByCompetition(competitionId: number): Promise<Phase[]> {
    return this.repository.findByCompetition(competitionId);
  }

  async createPhase(dto: CreatePhaseDto): Promise<Phase> {
    return this.repository.create(dto);
  }

  async updatePhase(id: number, dto: UpdatePhaseDto): Promise<Phase> {
    const phase = await this.repository.update(id, dto);
    if (!phase) {
      throw new Error(`Phase with ID ${id} not found`);
    }
    return phase;
  }

  async deletePhase(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Phase with ID ${id} not found`);
    }
  }
}

import { GroupRepository } from "./repository";
import { Group } from "./entity";
import { CreateGroupDto, UpdateGroupDto } from "./dto";

export class GroupService {
  private repository: GroupRepository;

  constructor() {
    this.repository = new GroupRepository();
  }

  async getAllGroups(): Promise<Group[]> {
    return this.repository.findAll();
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.repository.findById(id);
    if (!group) {
      throw new Error(`Group with ID ${id} not found`);
    }
    return group;
  }

  async getGroupsByPhase(phaseId: number): Promise<Group[]> {
    return this.repository.findByPhase(phaseId);
  }

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    return this.repository.create(dto);
  }

  async updateGroup(id: number, dto: UpdateGroupDto): Promise<Group> {
    const group = await this.repository.update(id, dto);
    if (!group) {
      throw new Error(`Group with ID ${id} not found`);
    }
    return group;
  }

  async deleteGroup(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Group with ID ${id} not found`);
    }
  }
}

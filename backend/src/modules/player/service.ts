import { PlayerRepository } from "./repository";
import { CreatePlayerDto, UpdatePlayerDto } from "./dto";
import { Player } from "./entity";

export class PlayerService {
  /**
   * Get all players
   */
  async getAll(): Promise<Player[]> {
    return PlayerRepository.find({
      relations: ["team"],
      order: { teamId: "ASC", jerseyNumber: "ASC" },
    });
  }

  /**
   * Get a player by ID
   */
  async getById(id: number): Promise<Player | null> {
    return PlayerRepository.findOne({
      where: { playerId: id },
      relations: ["team"],
    });
  }

  /**
   * Get all players for a team
   */
  async getByTeamId(teamId: number): Promise<Player[]> {
    return PlayerRepository.findByTeam(teamId);
  }

  /**
   * Create a new player
   */
  async create(dto: CreatePlayerDto): Promise<Player> {
    const player = PlayerRepository.create(dto);
    return PlayerRepository.save(player);
  }

  /**
   * Update a player
   */
  async update(id: number, dto: UpdatePlayerDto): Promise<Player | null> {
    const player = await this.getById(id);
    if (!player) return null;

    Object.assign(player, dto);
    return PlayerRepository.save(player);
  }

  /**
   * Delete a player
   */
  async delete(id: number): Promise<boolean> {
    const result = await PlayerRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }

  /**
   * Search players by name
   */
  async searchByName(name: string): Promise<Player[]> {
    return PlayerRepository.searchByName(name);
  }
}

export const playerService = new PlayerService();

import { AppDataSource } from "../../database";
import { Player } from "./entity";

export const PlayerRepository = AppDataSource.getRepository(Player).extend({
  /**
   * Find all players for a specific team
   */
  async findByTeam(teamId: number): Promise<Player[]> {
    return this.find({
      where: { teamId },
      relations: ["team"],
      order: { jerseyNumber: "ASC" },
    });
  },

  /**
   * Find a player by jersey number within a team
   */
  async findByJerseyNumber(teamId: number, jerseyNumber: number): Promise<Player | null> {
    return this.findOne({
      where: { teamId, jerseyNumber },
      relations: ["team"],
    });
  },

  /**
   * Find players by position
   */
  async findByPosition(position: string): Promise<Player[]> {
    return this.find({
      where: { position: position as any },
      relations: ["team"],
      order: { lastName: "ASC" },
    });
  },

  /**
   * Search players by name
   */
  async searchByName(name: string): Promise<Player[]> {
    return this.createQueryBuilder("player")
      .leftJoinAndSelect("player.team", "team")
      .where(
        "LOWER(player.first_name) LIKE LOWER(:name) OR LOWER(player.last_name) LIKE LOWER(:name)",
        { name: `%${name}%` }
      )
      .orderBy("player.last_name", "ASC")
      .getMany();
  },
});

import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "./config";
import { Competition } from "./modules/competition/entity";
import { Phase } from "./modules/phase/entity";
import { Group } from "./modules/group/entity";
import { Team } from "./modules/team/entity";
import { Match } from "./modules/match/entity";
import { MatchEvent } from "./modules/matchEvent/entity";
import { GroupStanding } from "./modules/standing/entity";
import { Player } from "./modules/player/entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [Competition, Phase, Group, Team, Match, MatchEvent, GroupStanding, Player],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
};

export const AppDataSource = new DataSource(dataSourceOptions);

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

export interface Config {
  port: number;
  corsOrigin: string | string[];
  db: DatabaseConfig;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

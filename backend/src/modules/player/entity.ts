import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Team } from "../team/entity";
import { PlayerPosition } from "./types";

@Entity("player")
export class Player {
  @PrimaryGeneratedColumn({ name: "player_id" })
  playerId!: number;

  @Column({ name: "team_id" })
  teamId!: number;

  @Column({ name: "first_name", length: 50 })
  firstName!: string;

  @Column({ name: "last_name", length: 50 })
  lastName!: string;

  @Column({ name: "jersey_number", type: "int" })
  jerseyNumber!: number;

  @Column({
    type: "enum",
    enum: PlayerPosition,
  })
  position!: PlayerPosition;

  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth?: Date;

  @Column({ length: 100, nullable: true })
  nationality?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => Team)
  @JoinColumn({ name: "team_id" })
  team!: Team;

  // Virtual field for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

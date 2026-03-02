import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { MatchEventType } from "../../types/enums";
import { Match } from "../match/entity";
import { Team } from "../team/entity";
import { Player } from "../player/entity";

@Entity("match_event")
export class MatchEvent {
  @PrimaryGeneratedColumn({ name: "event_id" })
  eventId!: number;

  @Column({ name: "match_id", type: "int" })
  matchId!: number;

  @Column({ name: "team_id", type: "int" })
  teamId!: number;

  @Column({ name: "player_id", type: "int", nullable: true })
  playerId?: number;

  @Column({ name: "event_type", type: "enum", enum: MatchEventType })
  eventType!: MatchEventType;

  @Column({ type: "int" })
  minute!: number;

  @Column({ name: "extra_info", type: "varchar", length: 255, nullable: true })
  extraInfo?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @ManyToOne(() => Match, { onDelete: "CASCADE" })
  @JoinColumn({ name: "match_id" })
  match?: Match;

  @ManyToOne(() => Team, { onDelete: "CASCADE" })
  @JoinColumn({ name: "team_id" })
  team?: Team;

  @ManyToOne(() => Player, { onDelete: "SET NULL" })
  @JoinColumn({ name: "player_id" })
  player?: Player;
}

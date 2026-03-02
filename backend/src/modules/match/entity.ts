import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  Check,
} from "typeorm";
import { MatchStatus } from "../../types/enums";
import { Phase } from "../phase/entity";
import { Group } from "../group/entity";
import { Team } from "../team/entity";

@Entity("match")
@Check(`"home_team_id" <> "away_team_id"`)
export class Match {
  @PrimaryGeneratedColumn({ name: "match_id" })
  matchId!: number;

  @Column({ name: "match_datetime", type: "timestamp" })
  matchDatetime!: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  stadium?: string;

  @Column({ type: "enum", enum: MatchStatus })
  status!: MatchStatus;

  @Column({ name: "home_score", type: "int", default: 0 })
  homeScore!: number;

  @Column({ name: "away_score", type: "int", default: 0 })
  awayScore!: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @Column({ name: "phase_id", type: "int" })
  phaseId!: number;

  @Column({ name: "group_id", type: "int", nullable: true })
  groupId?: number;

  @Column({ name: "home_team_id", type: "int" })
  homeTeamId!: number;

  @Column({ name: "away_team_id", type: "int" })
  awayTeamId!: number;

  @ManyToOne(() => Phase, (phase) => phase.matches, { onDelete: "CASCADE" })
  @JoinColumn({ name: "phase_id" })
  phase?: Phase;

  @ManyToOne(() => Group, (group) => group.matches, { onDelete: "SET NULL" })
  @JoinColumn({ name: "group_id" })
  group?: Group;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  @JoinColumn({ name: "home_team_id" })
  homeTeam?: Team;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  @JoinColumn({ name: "away_team_id" })
  awayTeam?: Team;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Group } from "../group/entity";
import { Team } from "../team/entity";

@Entity("group_standing")
@Unique(["groupId", "teamId"])
export class GroupStanding {
  @PrimaryGeneratedColumn({ name: "standing_id" })
  standingId!: number;

  @Column({ name: "group_id", type: "int" })
  groupId!: number;

  @Column({ name: "team_id", type: "int" })
  teamId!: number;

  @Column({ type: "int", default: 0 })
  played!: number;

  @Column({ type: "int", default: 0 })
  wins!: number;

  @Column({ type: "int", default: 0 })
  draw!: number;

  @Column({ type: "int", default: 0 })
  losses!: number;

  @Column({ name: "goals_for", type: "int", default: 0 })
  goalsFor!: number;

  @Column({ name: "goals_against", type: "int", default: 0 })
  goalsAgainst!: number;

  @Column({ name: "goal_difference", type: "int", default: 0 })
  goalDifference!: number;

  @Column({ type: "int", default: 0 })
  points!: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @ManyToOne(() => Group, (group) => group.standings)
  @JoinColumn({ name: "group_id" })
  group?: Group;

  @ManyToOne(() => Team, (team) => team.standings)
  @JoinColumn({ name: "team_id" })
  team?: Team;
}

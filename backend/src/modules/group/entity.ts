import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Phase } from "../phase/entity";
import { Match } from "../match/entity";
import { GroupStanding } from "../standing/entity";

@Entity("group_stage")
export class Group {
  @PrimaryGeneratedColumn({ name: "group_id" })
  groupId!: number;

  @Column({ type: "varchar", length: 5 })
  name!: string;

  @Column({ name: "phase_id", type: "int" })
  phaseId!: number;

  @ManyToOne(() => Phase, (phase) => phase.groups, { onDelete: "CASCADE" })
  @JoinColumn({ name: "phase_id" })
  phase?: Phase;

  @OneToMany(() => Match, (match) => match.group)
  matches?: Match[];

  @OneToMany(() => GroupStanding, (standing) => standing.group)
  standings?: GroupStanding[];
}

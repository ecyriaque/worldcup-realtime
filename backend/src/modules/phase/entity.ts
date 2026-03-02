import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { PhaseType } from "../../types/enums";
import { Competition } from "../competition/entity";
import { Group } from "../group/entity";
import { Match } from "../match/entity";

@Entity("phase")
export class Phase {
  @PrimaryGeneratedColumn({ name: "phase_id" })
  phaseId!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "enum", enum: PhaseType })
  type!: PhaseType;

  @Column({ name: "display_order", type: "int" })
  displayOrder!: number;

  @Column({ name: "competition_id", type: "int" })
  competitionId!: number;

  @ManyToOne(() => Competition, (competition) => competition.phases, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "competition_id" })
  competition?: Competition;

  @OneToMany(() => Group, (group) => group.phase)
  groups?: Group[];

  @OneToMany(() => Match, (match) => match.phase)
  matches?: Match[];
}

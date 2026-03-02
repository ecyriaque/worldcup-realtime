import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Phase } from "../phase/entity";

@Entity("competition")
export class Competition {
  @PrimaryGeneratedColumn({ name: "competition_id" })
  competitionId!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ name: "year_competition", type: "int" })
  yearCompetition!: number;

  @OneToMany(() => Phase, (phase) => phase.competition)
  phases?: Phase[];
}

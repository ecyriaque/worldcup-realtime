import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Match } from "../match/entity";
import { GroupStanding } from "../standing/entity";

@Entity("team")
export class Team {
  @PrimaryGeneratedColumn({ name: "team_id" })
  teamId!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 10, unique: true })
  code!: string;

  @Column({ name: "flag_url", type: "varchar", length: 255, nullable: true })
  flagUrl?: string;

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches?: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches?: Match[];

  @OneToMany(() => GroupStanding, (standing) => standing.team)
  standings?: GroupStanding[];
}

import { IsInt, IsOptional, Min } from "class-validator";

export class CreateGroupStandingDto {
  @IsInt()
  @Min(1)
  groupId!: number;

  @IsInt()
  @Min(1)
  teamId!: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  played?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  wins?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  draw?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  losses?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalsFor?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalsAgainst?: number;

  @IsInt()
  @IsOptional()
  goalDifference?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  points?: number;
}

export class UpdateGroupStandingDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  groupId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  teamId?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  played?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  wins?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  draw?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  losses?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalsFor?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalsAgainst?: number;

  @IsInt()
  @IsOptional()
  goalDifference?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  points?: number;
}

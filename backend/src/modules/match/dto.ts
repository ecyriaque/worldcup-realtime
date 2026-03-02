import {
  IsDate,
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  Max,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";
import { MatchStatus } from "../../types/enums";

export class CreateMatchDto {
  @Type(() => Date)
  @IsDate()
  matchDatetime!: Date;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  stadium?: string;

  @IsEnum(MatchStatus)
  status!: MatchStatus;

  @IsInt()
  @Min(0)
  homeScore?: number;

  @IsInt()
  @Min(0)
  awayScore?: number;

  @IsInt()
  @Min(1)
  phaseId!: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  groupId?: number;

  @IsInt()
  @Min(1)
  homeTeamId!: number;

  @IsInt()
  @Min(1)
  awayTeamId!: number;
}

export class UpdateMatchDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  matchDatetime?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  stadium?: string;

  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus;

  @IsInt()
  @Min(0)
  @IsOptional()
  homeScore?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  awayScore?: number;

  @IsInt()
  @Min(0)
  @Max(120)
  @IsOptional()
  currentMinute?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  phaseId?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  groupId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  homeTeamId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  awayTeamId?: number;
}

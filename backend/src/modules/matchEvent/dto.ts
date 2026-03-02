import {
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  Max,
  MaxLength,
} from "class-validator";
import { MatchEventType } from "../../types/enums";

export class CreateMatchEventDto {
  @IsInt()
  matchId!: number;

  @IsInt()
  teamId!: number;

  @IsInt()
  @IsOptional()
  playerId?: number;

  @IsEnum(MatchEventType)
  eventType!: MatchEventType;

  @IsInt()
  @Min(0)
  @Max(120)
  minute!: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  extraInfo?: string;
}

export class UpdateMatchEventDto {
  @IsInt()
  @IsOptional()
  playerId?: number;

  @IsEnum(MatchEventType)
  @IsOptional()
  eventType?: MatchEventType;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(120)
  minute?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  extraInfo?: string;
}

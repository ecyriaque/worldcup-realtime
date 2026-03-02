import { IsInt, IsString, IsEnum, IsOptional, Min, Max, IsDateString } from "class-validator";
import { PlayerPosition } from "./types";

export class CreatePlayerDto {
  @IsInt()
  teamId!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsInt()
  @Min(1)
  @Max(99)
  jerseyNumber!: number;

  @IsEnum(PlayerPosition)
  position!: PlayerPosition;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;
}

export class UpdatePlayerDto {
  @IsOptional()
  @IsInt()
  teamId?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  jerseyNumber?: number;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position?: PlayerPosition;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;
}

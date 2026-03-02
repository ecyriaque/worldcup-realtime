import {
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  Min,
} from "class-validator";
import { PhaseType } from "../../types/enums";

export class CreatePhaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEnum(PhaseType)
  type!: PhaseType;

  @IsInt()
  @Min(0)
  displayOrder!: number;

  @IsInt()
  @Min(1)
  competitionId!: number;
}

export class UpdatePhaseDto {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsEnum(PhaseType)
  type?: PhaseType;

  @IsInt()
  @Min(0)
  displayOrder?: number;

  @IsInt()
  @Min(1)
  competitionId?: number;
}

import { IsString, IsInt, IsNotEmpty, MaxLength, Min } from "class-validator";

export class CreateCompetitionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1900)
  yearCompetition!: number;
}

export class UpdateCompetitionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @IsInt()
  @Min(1900)
  yearCompetition?: number;
}

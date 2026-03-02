import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUrl,
} from "class-validator";

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  code!: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  flagUrl?: string;
}

export class UpdateTeamDto {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsString()
  @MaxLength(10)
  code?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  flagUrl?: string;
}

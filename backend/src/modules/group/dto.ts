import { IsString, IsInt, IsNotEmpty, MaxLength, Min } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  name!: string;

  @IsInt()
  @Min(1)
  phaseId!: number;
}

export class UpdateGroupDto {
  @IsString()
  @MaxLength(5)
  name?: string;

  @IsInt()
  @Min(1)
  phaseId?: number;
}

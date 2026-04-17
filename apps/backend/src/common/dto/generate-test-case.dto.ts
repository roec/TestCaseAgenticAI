import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum GenerationMode {
  STRICT = 'strict',
  RELAXED = 'relaxed'
}

export class GenerateTestCaseDto {
  @IsString()
  projectId!: string;

  @IsString()
  prompt!: string;

  @IsEnum(GenerationMode)
  mode!: GenerationMode;

  @IsBoolean()
  includePostman = true;

  @IsBoolean()
  includeSQL = true;

  @IsOptional()
  @IsString()
  documentContextId?: string;
}

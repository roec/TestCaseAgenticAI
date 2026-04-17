import { IsEnum, IsString } from 'class-validator';

export enum LlmProviderName {
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek'
}

export class LlmConfigDto {
  @IsEnum(LlmProviderName)
  provider!: LlmProviderName;

  @IsString()
  apiKey!: string;
}

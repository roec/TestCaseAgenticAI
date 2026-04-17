import { Body, Controller, Get, Post } from '@nestjs/common';
import { LlmConfigDto } from '../common/dto/llm-config.dto';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('config')
  setConfig(@Body() body: LlmConfigDto) {
    return this.llmService.setConfig(body.provider, body.apiKey);
  }

  @Get('config')
  getConfig() {
    return this.llmService.getState();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { SupervisorResult } from '../agent/agent.service';
import { GenerateTestCaseDto } from '../common/dto/generate-test-case.dto';
import { TestCaseService } from './test-case.service';

@Controller('test-case')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post('generate')
  generate(@Body() body: GenerateTestCaseDto): Promise<SupervisorResult> {
    return this.testCaseService.generate(body);
  }
}

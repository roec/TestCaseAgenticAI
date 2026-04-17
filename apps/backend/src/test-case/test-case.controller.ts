import { Body, Controller, Post } from '@nestjs/common';
import { GenerateTestCaseDto } from '../common/dto/generate-test-case.dto';
import { TestCaseService } from './test-case.service';

@Controller('test-case')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post('generate')
  generate(@Body() body: GenerateTestCaseDto) {
    return this.testCaseService.generate(body);
  }
}

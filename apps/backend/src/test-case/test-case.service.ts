import { Injectable } from '@nestjs/common';
import { AgentService } from '../agent/agent.service';
import { GenerateTestCaseDto } from '../common/dto/generate-test-case.dto';

@Injectable()
export class TestCaseService {
  constructor(private readonly agentService: AgentService) {}

  async generate(dto: GenerateTestCaseDto) {
    return this.agentService.runSupervisor(dto);
  }
}

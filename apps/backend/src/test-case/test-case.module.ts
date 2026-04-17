import { Module } from '@nestjs/common';
import { AgentModule } from '../agent/agent.module';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';

@Module({
  imports: [AgentModule],
  controllers: [TestCaseController],
  providers: [TestCaseService]
})
export class TestCaseModule {}

import { Module } from '@nestjs/common';
import { LlmModule } from '../llm/llm.module';
import { PostmanModule } from '../postman/postman.module';
import { RagModule } from '../rag/rag.module';
import { SqlModule } from '../sql/sql.module';
import { AgentService } from './agent.service';

@Module({
  imports: [RagModule, LlmModule, PostmanModule, SqlModule],
  providers: [AgentService],
  exports: [AgentService]
})
export class AgentModule {}

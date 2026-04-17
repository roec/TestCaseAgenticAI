import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { LlmModule } from './llm/llm.module';
import { PostmanModule } from './postman/postman.module';
import { ProjectModule } from './project/project.module';
import { RagModule } from './rag/rag.module';
import { SqlModule } from './sql/sql.module';
import { TestCaseModule } from './test-case/test-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProjectModule,
    DocumentModule,
    RagModule,
    LlmModule,
    AgentModule,
    PostmanModule,
    SqlModule,
    TestCaseModule
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DocumentModule } from '../document/document.module';
import { RagService } from './rag.service';

@Module({
  imports: [DocumentModule],
  providers: [RagService],
  exports: [RagService]
})
export class RagModule {}

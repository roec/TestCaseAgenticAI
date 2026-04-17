import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { DocumentService, DocumentType } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('projectId') projectId = 'default',
    @Body('type') type: DocumentType
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!type) {
      throw new BadRequestException('Document type is required: FD | TD | API | RPG_COBOL');
    }

    const content = file.buffer.toString('utf-8');
    return this.documentService.addDocument(projectId, type, file.originalname, content);
  }
}

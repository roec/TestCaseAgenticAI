import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type DocumentType = 'FD' | 'TD' | 'API' | 'RPG_COBOL';

export interface StoredDocument {
  id: string;
  projectId: string;
  type: DocumentType;
  originalName: string;
  content: string;
  uploadedAt: string;
}

@Injectable()
export class DocumentService {
  private readonly docs: StoredDocument[] = [];

  addDocument(projectId: string, type: DocumentType, originalName: string, content: string) {
    const doc: StoredDocument = {
      id: randomUUID(),
      projectId,
      type,
      originalName,
      content,
      uploadedAt: new Date().toISOString()
    };
    this.docs.push(doc);
    return doc;
  }

  getProjectDocuments(projectId: string) {
    return this.docs.filter((doc) => doc.projectId === projectId);
  }
}

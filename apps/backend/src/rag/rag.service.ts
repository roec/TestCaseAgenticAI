import { Injectable } from '@nestjs/common';
import { DocumentService } from '../document/document.service';

export interface RagChunk {
  id: string;
  section: string;
  sourceDocument: string;
  text: string;
  score: number;
}

@Injectable()
export class RagService {
  constructor(private readonly documentService: DocumentService) {}

  retrieve(projectId: string, query: string, topK = 6): RagChunk[] {
    const docs = this.documentService.getProjectDocuments(projectId);
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const chunks = docs.flatMap((doc) =>
      doc.content
        .split(/\n\n+/)
        .filter(Boolean)
        .map((text, index) => ({
          id: `${doc.id}-${index}`,
          section: `Section-${index + 1}`,
          sourceDocument: doc.originalName,
          text,
          score: this.scoreChunk(text, terms)
        }))
    );

    return chunks.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  private scoreChunk(text: string, terms: string[]) {
    const lower = text.toLowerCase();
    return terms.reduce((acc, term) => acc + (lower.includes(term) ? 1 : 0), 0) + Math.min(text.length / 600, 1);
  }
}

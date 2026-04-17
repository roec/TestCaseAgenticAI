import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  private readonly projects = new Map<string, { id: string; name: string }>();

  constructor() {
    this.projects.set('default', { id: 'default', name: 'Default Enterprise Project' });
  }

  getById(projectId: string) {
    return this.projects.get(projectId) ?? this.projects.get('default');
  }
}

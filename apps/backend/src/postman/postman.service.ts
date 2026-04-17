import { Injectable } from '@nestjs/common';

@Injectable()
export class PostmanService {
  buildRequest(scenario: string, endpoint = '/api/s89/validate') {
    return {
      method: 'POST',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Mode': 'strict'
      },
      body: {
        scenario,
        traceId: '{{traceId}}'
      }
    };
  }

  buildCollection(testCases: Array<{ testCaseId: string; postman: any }>) {
    return {
      info: {
        name: 'Test Case Agentic Collection',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
      },
      item: testCases.map((tc) => ({
        name: tc.testCaseId,
        request: tc.postman
      }))
    };
  }
}

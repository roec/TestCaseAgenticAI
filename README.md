# Test Case Agentic AI Platform

Production-style full-stack platform that generates enterprise-grade test cases from Functional/Technical design documents and API specs.

## Stack
- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: NestJS, REST API
- **Data**: PostgreSQL (pgvector-ready), Redis
- **LLM providers**: OpenAI + DeepSeek, switchable at runtime

## Monorepo Structure

```text
apps/
  backend/
    src/
      auth/
      project/
      document/
      rag/
      agent/
      test-case/
      postman/
      sql/
      llm/
  frontend/
    app/
    components/
    lib/
docker-compose.yml
```

## APIs
- `POST /api/documents/upload`
- `POST /api/test-case/generate`
- `POST /api/llm/config`

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000/api`

## Docker

```bash
docker compose up --build
```

## Sample Output

```json
{
  "testCaseId": "TC-S89-001",
  "scenario": "Normal flow",
  "input": {"customerId":"CUST-1"},
  "steps": ["Prepare valid auth token and project context"],
  "expected": {"statusCode": 200},
  "postman": {
    "method": "POST",
    "url": "/api/s89/validate",
    "headers": {"Content-Type": "application/json"},
    "body": {"scenario": "Normal flow"}
  },
  "sqlValidation": [
    "SELECT CUSTOMER_ID, STATUS, UPDATED_AT FROM CCRWLUP WHERE CUSTOMER_ID = 'CUST-1';"
  ]
}
```

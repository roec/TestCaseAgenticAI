const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';

export type GeneratePayload = {
  projectId: string;
  prompt: string;
  mode: 'strict' | 'relaxed';
  includePostman: boolean;
  includeSQL: boolean;
};

export async function setLlmConfig(provider: 'openai' | 'deepseek', apiKey: string) {
  const res = await fetch(`${API_BASE_URL}/llm/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, apiKey })
  });
  if (!res.ok) throw new Error('Failed to save LLM configuration');
  return res.json();
}

export async function uploadDocument(file: File, type: string, projectId = 'default') {
  const form = new FormData();
  form.append('file', file);
  form.append('type', type);
  form.append('projectId', projectId);

  const res = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: 'POST',
    body: form
  });
  if (!res.ok) throw new Error('Failed to upload document');
  return res.json();
}

export async function generateTestCases(payload: GeneratePayload) {
  const res = await fetch(`${API_BASE_URL}/test-case/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to generate test cases');
  return res.json();
}

'use client';

import { useMemo, useState } from 'react';
import { Bot, Database, FileStack, FlaskConical, ScrollText } from 'lucide-react';
import { generateTestCases, setLlmConfig, uploadDocument } from '../lib/api';

type Tab = 'testCases' | 'postman' | 'sql' | 'coverage' | 'logs';

export function PlatformDashboard() {
  const [provider, setProvider] = useState<'openai' | 'deepseek'>('openai');
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('Generate S89 test cases in strict mode');
  const [mode, setMode] = useState<'strict' | 'relaxed'>('strict');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>('testCases');
  const [status, setStatus] = useState('Ready');

  const tabs = useMemo(
    () => [
      { id: 'testCases' as Tab, label: 'Test Cases', icon: FlaskConical },
      { id: 'postman' as Tab, label: 'Postman', icon: FileStack },
      { id: 'sql' as Tab, label: 'SQL Validation', icon: Database },
      { id: 'coverage' as Tab, label: 'Coverage Analysis', icon: ScrollText },
      { id: 'logs' as Tab, label: 'Agent Logs', icon: Bot }
    ],
    []
  );

  async function onConfigureLlm() {
    setStatus('Saving LLM configuration...');
    await setLlmConfig(provider, apiKey);
    setStatus(`LLM provider set to ${provider.toUpperCase()}`);
  }

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>, type: string) {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus(`Uploading ${file.name}...`);
    await uploadDocument(file, type);
    setStatus(`Uploaded ${type} document: ${file.name}`);
  }

  async function onGenerate() {
    setStatus('Running multi-agent workflow...');
    const data = await generateTestCases({
      projectId: 'default',
      prompt,
      mode,
      includePostman: true,
      includeSQL: true
    });
    setResult(data);
    setStatus('Generation complete');
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Test Case Agentic AI Platform</h1>
            <p className="text-sm text-slate-600">Enterprise-grade test case automation with RAG + multi-agent orchestration</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <select value={provider} onChange={(e) => setProvider(e.target.value as 'openai' | 'deepseek')} className="rounded-xl border px-3 py-2">
              <option value="openai">OpenAI</option>
              <option value="deepseek">DeepSeek</option>
            </select>
            <input
              placeholder="API key"
              type="password"
              className="rounded-xl border px-3 py-2 min-w-64"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button onClick={onConfigureLlm} className="rounded-xl bg-brand-700 text-white px-4 py-2 hover:bg-brand-500 transition-colors">
              Save Config
            </button>
          </div>
        </header>

        <main className="grid lg:grid-cols-5 gap-6">
          <section className="card p-5 lg:col-span-2 space-y-5">
            <h2 className="text-lg font-semibold">Input Workspace</h2>
            <div className="space-y-3 text-sm">
              <label className="block">Functional Design (FD)<input type="file" onChange={(e) => onUpload(e, 'FD')} className="mt-1 block w-full" /></label>
              <label className="block">Technical Design (TD)<input type="file" onChange={(e) => onUpload(e, 'TD')} className="mt-1 block w-full" /></label>
              <label className="block">API Spec / Swagger / Postman<input type="file" onChange={(e) => onUpload(e, 'API')} className="mt-1 block w-full" /></label>
              <label className="block">RPG / COBOL (optional)<input type="file" onChange={(e) => onUpload(e, 'RPG_COBOL')} className="mt-1 block w-full" /></label>
            </div>
            <div className="space-y-2">
              <textarea
                className="w-full rounded-2xl border p-3 min-h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <select value={mode} onChange={(e) => setMode(e.target.value as 'strict' | 'relaxed')} className="rounded-xl border px-3 py-2 w-full">
                <option value="strict">Strict mode</option>
                <option value="relaxed">Relaxed mode</option>
              </select>
              <button onClick={onGenerate} className="w-full rounded-xl bg-slate-900 text-white py-2.5 hover:bg-slate-700 transition-colors">Generate Test Cases</button>
              <p className="text-xs text-slate-500">Status: {status}</p>
            </div>
          </section>

          <section className="card p-5 lg:col-span-3">
            <div className="flex flex-wrap gap-2 border-b pb-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm ${activeTab === id ? 'bg-brand-700 text-white' : 'bg-slate-100'}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 max-h-[560px] overflow-auto">
              {!result && <p className="text-sm text-slate-500">Run generation to view outputs.</p>}
              {result && activeTab === 'testCases' && <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.testCases, null, 2)}</pre>}
              {result && activeTab === 'postman' && <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.postmanCollection, null, 2)}</pre>}
              {result && activeTab === 'sql' && (
                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.testCases?.map((tc: any) => ({ testCaseId: tc.testCaseId, sqlValidation: tc.sqlValidation })), null, 2)}</pre>
              )}
              {result && activeTab === 'coverage' && <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.coverage, null, 2)}</pre>}
              {result && activeTab === 'logs' && <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.logs, null, 2)}</pre>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

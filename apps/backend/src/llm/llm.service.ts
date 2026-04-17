import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LlmProviderName } from '../common/dto/llm-config.dto';
import { LLMProvider } from './llm.types';

class OpenAIProvider implements LLMProvider {
  constructor(private readonly apiKey: string) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      'https://api.openai.com/v1/responses',
      { model: 'gpt-4.1-mini', input: prompt },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.output_text ?? JSON.stringify(response.data);
  }
}

class DeepSeekProvider implements LLMProvider {
  constructor(private readonly apiKey: string) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }]
      },
      { headers: { Authorization: `Bearer ${this.apiKey}` } }
    );
    return response.data.choices?.[0]?.message?.content ?? JSON.stringify(response.data);
  }
}

@Injectable()
export class LlmService {
  private provider: LlmProviderName = LlmProviderName.OPENAI;
  private apiKey = '';

  setConfig(provider: LlmProviderName, apiKey: string) {
    this.provider = provider;
    this.apiKey = apiKey;
    return { provider: this.provider, configured: Boolean(this.apiKey) };
  }

  async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      return `LLM not configured. Fallback synthesis for prompt: ${prompt.slice(0, 180)}...`;
    }
    return this.getProvider().generate(prompt);
  }

  getState() {
    return { provider: this.provider, configured: Boolean(this.apiKey) };
  }

  private getProvider(): LLMProvider {
    return this.provider === LlmProviderName.DEEPSEEK
      ? new DeepSeekProvider(this.apiKey)
      : new OpenAIProvider(this.apiKey);
  }
}

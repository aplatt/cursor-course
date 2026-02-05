import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';

export type SummaryResponse = {
  summary: string;
  cool_facts: string[];
};

export const getApiKeyFromRequest = async (request: Request) => {
  const headerKey = request.headers.get('x-api-key')?.trim();
  if (headerKey) return headerKey;

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const bearerKey = authHeader.replace('Bearer ', '').trim();
    if (bearerKey) return bearerKey;
  }

  return null;
};

export const getGithubUrlFromRequest = async (request: Request) => {
  try {
    const body = await request.json();
    return typeof body?.githubUrl === 'string' ? body.githubUrl.trim() : undefined;
  } catch {
    return undefined;
  }
};

const summarySchema = z.object({
  summary: z.string().min(1),
  cool_facts: z.array(z.string().min(1)).length(3),
});

const getRepoInfoFromGithubUrl = (url: string): { owner: string; repo: string } | null => {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i);
    if (!match) return null;
    const owner = match[1];
    let repo = match[2];
    if (repo.endsWith('.git')) {
      repo = repo.slice(0, -4);
    }
    return { owner, repo };
  } catch {
    return null;
  }
};

export const fetchReadmeFromGithubRepo = async (githubUrl: string): Promise<string | null> => {
  const repoInfo = getRepoInfoFromGithubUrl(githubUrl);
  if (!repoInfo) return null;

  const defaultBranches = ['main', 'master'];
  for (const branch of defaultBranches) {
    const apiUrl = `https://raw.githubusercontent.com/${repoInfo.owner}/${repoInfo.repo}/${branch}/README.md`;
    try {
      const res = await fetch(apiUrl, { headers: { Accept: 'text/plain' } });
      if (res.ok) {
        const text = await res.text();
        if (text.trim().length > 0) {
          return text;
        }
      }
    } catch {
      // ignore and try next branch
    }
  }
  return null;
};

export const generateSummaryWithGemini = async (readmeContent: string): Promise<SummaryResponse> => {
  const apiKeyEnv = process.env.GEMINI_API_KEY;
  if (!apiKeyEnv) {
    throw new Error('Missing GEMINI_API_KEY in environment.');
  }

  const model = new ChatGoogleGenerativeAI({
    apiKey: apiKeyEnv,
    model: 'gemini-2.5-flash',
    temperature: 0.2,
  });

  const structuredModel = model.withStructuredOutput(summarySchema);

  const prompt = `Summarize this GitHub repository README.
Return JSON with:
- "summary": string
- "cool_facts": array of 3 strings

README:
${readmeContent}`;

  const response = await structuredModel.invoke(prompt);

  return response;
};

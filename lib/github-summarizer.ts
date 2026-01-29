import { GoogleGenerativeAI } from '@google/generative-ai';

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

const parseSummaryResponse = (content: string): SummaryResponse => {
  try {
    const parsed = JSON.parse(content) as { summary?: string; cool_facts?: string[] };
    return {
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      cool_facts: Array.isArray(parsed.cool_facts)
        ? parsed.cool_facts.filter((fact) => typeof fact === 'string')
        : [],
    };
  } catch {
    return { summary: '', cool_facts: [] };
  }
};

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

  const genAI = new GoogleGenerativeAI(apiKeyEnv);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const prompt = `Summarize this GitHub repository README.
Return ONLY valid JSON with:
- "summary": string
- "cool_facts": array of 3 strings

README:
${readmeContent}`;

  const result = await model.generateContent(prompt);
  const content = result.response.text();
  let response = parseSummaryResponse(content);

  if (!response.summary || response.cool_facts.length === 0) {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      response = parseSummaryResponse(jsonMatch[0]);
    }
  }

  return response;
};

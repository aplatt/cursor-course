'use server';

import {
  fetchReadmeFromGithubRepo,
  generateSummaryWithGemini,
  type SummaryResponse,
} from '@/lib/github-summarizer';

export type AnalyzeResult =
  | { ok: true; data: SummaryResponse; repoUrl: string }
  | { ok: false; error: string };

export async function analyzeRepo(repoUrl: string): Promise<AnalyzeResult> {
  if (!repoUrl.trim()) {
    return { ok: false, error: 'Repository URL is required.' };
  }

  const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+/i;
  if (!githubUrlPattern.test(repoUrl)) {
    return { ok: false, error: 'Please provide a valid GitHub repository URL.' };
  }

  const readmeContent = await fetchReadmeFromGithubRepo(repoUrl);
  if (!readmeContent) {
    return { ok: false, error: 'Could not find a README for this repository.' };
  }

  try {
    const summary = await generateSummaryWithGemini(readmeContent);

    if (!summary.summary || summary.cool_facts.length === 0) {
      return { ok: false, error: 'AI analysis returned an incomplete response. Please try again.' };
    }

    return { ok: true, data: summary, repoUrl };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed unexpectedly.';
    return { ok: false, error: message };
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import {
  fetchReadmeFromGithubRepo,
  generateSummaryWithGemini,
  getApiKeyFromRequest,
  getGithubUrlFromRequest,
} from '@/lib/github-summarizer';

export async function POST(request: Request) {
  const apiKey = await getApiKeyFromRequest(request);

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('api_keys')
    .select('id')
    .eq('key_value', apiKey)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  const githubUrl = await getGithubUrlFromRequest(request);

  if (!githubUrl) {
    return NextResponse.json({ error: 'githubUrl is required in request body' }, { status: 400 });
  }

  const readmeContent = await fetchReadmeFromGithubRepo(githubUrl);

  if (!readmeContent) {
    return NextResponse.json({ error: 'README.md not found or unable to fetch' }, { status: 404 });
  }

  console.log('README.md content:', readmeContent);

  let response;
  try {
    response = await generateSummaryWithGemini(readmeContent);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to call Gemini.' },
      { status: 500 }
    );
  }

  if (!response.summary || response.cool_facts.length === 0) {
    return NextResponse.json(
      { error: 'Failed to generate summary from LLM response.' },
      { status: 502 }
    );
  }

  return NextResponse.json(response);
}

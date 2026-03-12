'use server';

type DemoResult =
  | { ok: true; status: number; data: { summary: string; cool_facts: string[] } }
  | { ok: false; status: number; error: string };

export async function demoSummarize(githubUrl: string): Promise<DemoResult> {
  const apiKey = process.env.DEMO_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: 'Demo API key is not configured.' };
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`;

  try {
    const res = await fetch(`${baseUrl}/api/github-summarizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ githubUrl }),
    });

    const body = await res.json();

    if (!res.ok) {
      return { ok: false, status: res.status, error: body.error ?? 'Request failed.' };
    }

    return { ok: true, status: res.status, data: body };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      error: err instanceof Error ? err.message : 'An unexpected error occurred.',
    };
  }
}

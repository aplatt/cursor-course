'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Lightbulb, BookOpen, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { analyzeRepo, type AnalyzeResult } from './actions';

type Status = 'loading' | 'success' | 'error';

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const repo = searchParams.get('repo') ?? '';

  const [status, setStatus] = useState<Status>('loading');
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const runAnalysis = useCallback(async () => {
    if (!repo) {
      setResult({ ok: false, error: 'No repository URL provided.' });
      setStatus('error');
      return;
    }

    setStatus('loading');
    setResult(null);

    const res = await analyzeRepo(decodeURIComponent(repo));
    setResult(res);
    setStatus(res.ok ? 'success' : 'error');
  }, [repo]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  const decodedRepo = repo ? decodeURIComponent(repo) : '';
  const repoName = decodedRepo.replace(/^https?:\/\/(www\.)?github\.com\//i, '');

  return (
    <>
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="mb-8 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      {/* Repo header */}
      {decodedRepo && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Repository Analysis
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground break-all">
            {decodedRepo}
          </p>
        </div>
      )}

      {/* Loading state */}
      {status === 'loading' && (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-6 text-lg font-medium text-foreground">Analyzing repository...</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Fetching README and generating AI insights for{' '}
              <span className="font-mono font-semibold">{repoName}</span>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {status === 'error' && result && !result.ok && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <p className="mt-4 text-lg font-medium text-foreground">Analysis Failed</p>
            <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
              {result.error}
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" onClick={runAnalysis}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  New Search
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success state */}
      {status === 'success' && result?.ok && (
        <div className="space-y-6">
          {/* Summary card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {result.data.summary}
              </p>
            </CardContent>
          </Card>

          {/* Cool facts card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle className="text-xl">Cool Facts</CardTitle>
                <Badge variant="secondary" className="ml-auto">
                  {result.data.cool_facts.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {result.data.cool_facts.map((fact, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-muted-foreground">{fact}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={runAnalysis}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Re-analyze
            </Button>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Analyze Another
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function AnalyzeLoading() {
  return (
    <>
      <div className="mb-8 h-8 w-32 animate-pulse rounded bg-muted" />
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-6 text-lg font-medium text-foreground">Loading...</p>
        </CardContent>
      </Card>
    </>
  );
}

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Suspense fallback={<AnalyzeLoading />}>
          <AnalyzeContent />
        </Suspense>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import CopyNoticeToast from '../components/CopyNoticeToast';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import type { CopyNotice } from '../types';

export default function ApiPlaygroundPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [notice, setNotice] = useState<CopyNotice>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch('/api/keys/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: apiKey }),
      });

      const data = await response.json();
      const isValid = response.ok && Boolean(data?.valid);

      setNotice({
        type: isValid ? 'success' : 'error',
        message: isValid ? 'valid key' : 'Invalid API key',
      });
    } catch (error) {
      console.error('Failed to validate API key:', error);
      setNotice({ type: 'error', message: 'Invalid API key' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotice(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <CopyNoticeToast notice={notice} />
      <div className="flex min-h-screen">
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((current) => !current)}
        />
        <main className="flex-1 px-10 py-8">
          <DashboardHeader title="API Playground" breadcrumb="Pages / API Playground" />
          <section className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">Validate an API key</h2>
              <p className="text-sm text-slate-500">
                Submit your API key below to confirm it is active.
              </p>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="api-key">
                  API key
                </label>
                <input
                  id="api-key"
                  type="text"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder="Enter API key"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSubmitting ? 'Validating...' : 'Validate key'}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

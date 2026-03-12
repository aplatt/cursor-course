'use client';

import type { ApiKey } from '../types';

type ApiKeysTableProps = {
  apiKeys: ApiKey[];
  isLoading: boolean;
  copiedId: string | null;
  onCreate: () => void;
  onCopy: (apiKey: ApiKey) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDeleteRequest: (apiKey: ApiKey) => void;
};

export default function ApiKeysTable({
  apiKeys,
  isLoading,
  copiedId,
  onCreate,
  onCopy,
  onEdit,
  onDeleteRequest,
}: ApiKeysTableProps) {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">API Keys</h2>
        <button
          onClick={onCreate}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
          aria-label="Create API key"
        >
          +
        </button>
      </div>

      {/* Mobile card layout */}
      <div className="mt-4 space-y-3 md:hidden">
        {isLoading ? (
          <p className="py-4 text-sm text-slate-500">Loading API keys...</p>
        ) : apiKeys.length === 0 ? (
          <p className="py-4 text-sm text-slate-500">
            No API keys yet. Create your first key to get started.
          </p>
        ) : (
          apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">{apiKey.name}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  dev
                </span>
              </div>
              <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
                {apiKey.key}
              </div>
              <div className="mt-2 text-xs text-slate-500">Usage: 0</div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => onCopy(apiKey)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                >
                  {copiedId === apiKey.id ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={() => onEdit(apiKey)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteRequest(apiKey)}
                  className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop table layout */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-slate-100 md:block">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Usage</th>
              <th className="px-4 py-3 text-left">Key</th>
              <th className="px-4 py-3 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={5}>
                  Loading API keys...
                </td>
              </tr>
            ) : apiKeys.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={5}>
                  No API keys yet. Create your first key to get started.
                </td>
              </tr>
            ) : (
              apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="border-t border-slate-100">
                  <td className="px-4 py-4 font-medium text-slate-900">{apiKey.name}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                      dev
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500">0</td>
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
                      {apiKey.key}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <button
                        onClick={() => onCopy(apiKey)}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
                      >
                        {copiedId === apiKey.id ? 'Copied' : 'Copy'}
                      </button>
                      <button
                        onClick={() => onEdit(apiKey)}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteRequest(apiKey)}
                        className="rounded-lg border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

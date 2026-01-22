'use client';

import type { FormEvent } from 'react';
import type { ApiKey } from '../types';

type ApiKeyFormData = {
  name: string;
  key: string;
};

type ApiKeyModalProps = {
  isOpen: boolean;
  editingKey: ApiKey | null;
  formData: ApiKeyFormData;
  keyType: 'development' | 'production';
  limitEnabled: boolean;
  monthlyLimit: string;
  onChange: (formData: ApiKeyFormData) => void;
  onKeyTypeChange: (value: 'development' | 'production') => void;
  onLimitEnabledChange: (value: boolean) => void;
  onMonthlyLimitChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
};

export default function ApiKeyModal({
  isOpen,
  editingKey,
  formData,
  keyType,
  limitEnabled,
  monthlyLimit,
  onChange,
  onKeyTypeChange,
  onLimitEnabledChange,
  onMonthlyLimitChange,
  onSubmit,
  onCancel,
}: ApiKeyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            {editingKey ? 'Edit API Key' : 'Create a new API key'}
          </h2>
          {!editingKey && (
            <p className="mt-2 text-sm text-slate-500">
              Enter a name and limit for the new API key.
            </p>
          )}
        </div>
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-900">Key Name</label>
            <span className="ml-2 text-sm text-slate-500">
              — A unique name to identify this key
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => onChange({ ...formData, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Key Name"
              required
            />
          </div>

          {!editingKey && (
            <div>
              <label className="text-sm font-semibold text-slate-900">Key Type</label>
              <span className="ml-2 text-sm text-slate-500">
                — Choose the environment for this key
              </span>
              <div className="mt-3 space-y-3">
                <label className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="keyType"
                    checked={keyType === 'development'}
                    onChange={() => onKeyTypeChange('development')}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">Development</div>
                    <div className="text-xs text-slate-500">
                      Rate limited to 100 requests/minute
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                  <input
                    type="radio"
                    name="keyType"
                    checked={keyType === 'production'}
                    onChange={() => onKeyTypeChange('production')}
                    className="h-4 w-4 text-blue-600"
                    disabled
                  />
                  <div>
                    <div className="font-semibold text-slate-400">Production</div>
                    <div className="text-xs text-slate-400">
                      Rate limited to 1,000 requests/minute
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {!editingKey && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <input
                  type="checkbox"
                  checked={limitEnabled}
                  onChange={(event) => onLimitEnabledChange(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                Limit monthly usage*
              </label>
              <input
                type="number"
                min="0"
                value={monthlyLimit}
                onChange={(event) => onMonthlyLimitChange(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="1000"
                disabled={!limitEnabled}
              />
              <p className="mt-3 text-xs text-slate-400">
                * If combined usage exceeds your allocated usage limit, all requests are rejected.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="rounded-full bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200 disabled:opacity-60"
            >
              {editingKey ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

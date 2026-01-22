'use client';

import type { ApiKey } from '../types';

type DeleteConfirmToastProps = {
  deleteTarget: ApiKey | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmToast({
  deleteTarget,
  onCancel,
  onConfirm,
}: DeleteConfirmToastProps) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed right-6 top-6 z-50 w-full max-w-sm rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-lg">
      <div className="text-xs font-semibold uppercase text-rose-600">Delete API Key</div>
      <div className="mt-2 font-semibold text-rose-800">
        Delete &quot;{deleteTarget.name}&quot;?
      </div>
      <div className="mt-1 text-xs text-rose-700/80">This action cannot be undone.</div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-rose-200 px-3 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

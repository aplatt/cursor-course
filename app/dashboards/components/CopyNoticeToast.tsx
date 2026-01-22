'use client';

import type { CopyNotice } from '../types';

type CopyNoticeToastProps = {
  notice: CopyNotice;
};

export default function CopyNoticeToast({ notice }: CopyNoticeToastProps) {
  if (!notice) return null;

  return (
    <div
      className={`fixed right-6 top-6 z-50 rounded-xl border px-4 py-3 text-sm shadow-lg ${
        notice.type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-rose-200 bg-rose-50 text-rose-700'
      }`}
    >
      {notice.message}
    </div>
  );
}

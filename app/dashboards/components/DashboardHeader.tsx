'use client';

import AuthControls from '../../components/AuthControls';

type DashboardHeaderProps = {
  title?: string;
  breadcrumb?: string;
};

export default function DashboardHeader({
  title = 'Overview',
  breadcrumb = 'Pages / Overview',
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-slate-500">{breadcrumb}</div>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <AuthControls />
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Operational
        </div>
        <button className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500">
          ✉
        </button>
        <button className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500">
          ☾
        </button>
      </div>
    </div>
  );
}

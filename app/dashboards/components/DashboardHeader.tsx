'use client';

import AuthControls from '../../components/AuthControls';

type DashboardHeaderProps = {
  title?: string;
  breadcrumb?: string;
  onMobileMenuToggle?: () => void;
};

export default function DashboardHeader({
  title = 'Overview',
  breadcrumb = 'Pages / Overview',
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        )}
        <div>
          <div className="text-xs text-slate-500">{breadcrumb}</div>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <AuthControls />
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 sm:inline-flex">
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

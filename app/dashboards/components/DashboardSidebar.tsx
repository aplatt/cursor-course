'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type DashboardSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export default function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();
  const isOverview = pathname === '/dashboards';
  const isPlayground = pathname === '/dashboards/playground';

  const getNavClass = (isActive: boolean) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 ${
      isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
    } ${isCollapsed ? 'justify-center' : ''}`;

  return (
    <aside
      className={`border-r border-slate-200 bg-white py-6 transition-all duration-200 ${
        isCollapsed ? 'w-20 px-4' : 'w-64 px-6'
      }`}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />
          {!isCollapsed && <div className="text-lg font-semibold">API Ops</div>}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="h-8 w-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-pressed={isCollapsed}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <div
        className={`mt-6 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 ${
          isCollapsed ? 'text-center' : ''
        }`}
      >
        {isCollapsed ? 'P' : 'Personal'}
      </div>
      <nav className="mt-6 space-y-1 text-sm">
        <Link className={getNavClass(isOverview)} href="/dashboards" aria-label="Overview">
          {isCollapsed ? 'O' : 'Overview'}
        </Link>
        <Link
          className={getNavClass(isPlayground)}
          href="/dashboards/playground"
          aria-label="API Playground"
        >
          {isCollapsed ? 'A' : 'API Playground'}
        </Link>
        <a
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          href="#"
          aria-label="Use Cases"
        >
          {isCollapsed ? 'U' : 'Use Cases'}
        </a>
        <a
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          href="#"
          aria-label="Billing"
        >
          {isCollapsed ? 'B' : 'Billing'}
        </a>
        <a
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          href="#"
          aria-label="Settings"
        >
          {isCollapsed ? 'S' : 'Settings'}
        </a>
        <a
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          href="#"
          aria-label="Documentation"
        >
          {isCollapsed ? 'D' : 'Documentation'}
        </a>
      </nav>
      <div className={`mt-10 text-xs text-slate-400 ${isCollapsed ? 'text-center' : ''}`}>
        <Link href="/" className="hover:text-slate-600" aria-label="Back to Home">
          {isCollapsed ? 'H' : 'Back to Home'}
        </Link>
      </div>
    </aside>
  );
}

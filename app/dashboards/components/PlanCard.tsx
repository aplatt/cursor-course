'use client';

export default function PlanCard() {
  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-400 via-rose-400 to-blue-400 p-5 text-white shadow-lg sm:rounded-3xl sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide">
            Current Plan
          </div>
          <div className="mt-4 text-2xl font-semibold sm:text-3xl">Researcher</div>
        </div>
        <button className="text-sm text-white/90 hover:text-white">Manage Plan</button>
      </div>
      <div className="mt-8 max-w-xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-white/90">
          API Usage
          <span className="text-xs text-white/70">Monthly plan</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/30">
          <div className="h-2 w-0 rounded-full bg-white" />
        </div>
        <div className="mt-2 text-sm text-white/90">0 / 1,000 Credits</div>
      </div>
    </div>
  );
}

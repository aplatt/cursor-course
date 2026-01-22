'use client';

export default function PlanCard() {
  return (
    <div className="mt-6 rounded-3xl bg-gradient-to-r from-purple-400 via-rose-400 to-blue-400 p-8 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide">
            Current Plan
          </div>
          <div className="mt-4 text-3xl font-semibold">Researcher</div>
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

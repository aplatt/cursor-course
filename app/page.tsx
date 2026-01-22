import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-slate-200 bg-white px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />
            <div className="text-lg font-semibold">API Ops</div>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Personal
          </div>
          <nav className="mt-6 space-y-1 text-sm">
            <a className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-slate-900" href="#">
              Overview
            </a>
            <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              API Playground
            </a>
            <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              Use Cases
            </a>
            <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              Billing
            </a>
            <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              Settings
            </a>
            <a className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              Documentation
            </a>
          </nav>
        </aside>

        <main className="flex-1 px-10 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Pages / Overview</div>
              <h1 className="text-3xl font-semibold text-slate-900">Overview</h1>
            </div>
            <div className="flex items-center gap-3">
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

          <section className="mt-6 rounded-3xl bg-gradient-to-r from-purple-400 via-rose-400 to-blue-400 p-8 text-white shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide">
                  Current Plan
                </div>
                <div className="mt-4 text-3xl font-semibold">Researcher</div>
                <p className="mt-2 max-w-lg text-sm text-white/90">
                  Manage API keys, track usage, and configure access policies for your team.
                </p>
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
          </section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">API Keys</h2>
                <p className="text-sm text-slate-500">
                  Create and manage keys for your applications.
                </p>
              </div>
              <Link
                href="/dashboards"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Manage API Keys
              </Link>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Active Keys</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">1</div>
              <p className="mt-2 text-xs text-slate-500">Based on current workspace.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Usage Today</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">0</div>
              <p className="mt-2 text-xs text-slate-500">No requests recorded.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">Environment</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">Development</div>
              <p className="mt-2 text-xs text-slate-500">Switch to production when ready.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthControls() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <div className="flex items-center gap-3 text-xs text-slate-600">
      {isLoading ? (
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
          Checking session...
        </span>
      ) : session?.user ? (
        <>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {session.user.name ?? session.user.email ?? 'Signed in'}
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => signIn('google')}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

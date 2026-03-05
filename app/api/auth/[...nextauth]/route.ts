import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';

const authEnabled = Boolean(clientId && clientSecret);

const handler = NextAuth({
  providers: authEnabled
    ? [
        GoogleProvider({
          clientId,
          clientSecret,
        }),
      ]
    : [],
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret-replace-me',
  session: { strategy: 'jwt' },
  events: {
    async signIn({ user, account }) {
      if (!user.email) return;

      try {
        const { supabase } = await import('@/lib/supabase/server');
        if (!supabase) return;

        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .maybeSingle();

        if (existingUser) {
          await supabase
            .from('users')
            .update({ last_login_at: new Date().toISOString() })
            .eq('id', existingUser.id);
        } else {
          await supabase.from('users').insert({
            email: user.email,
            name: user.name ?? null,
            image: user.image ?? null,
            provider: account?.provider ?? 'google',
            provider_account_id: account?.providerAccountId ?? null,
          });
        }
      } catch (error) {
        console.error('Failed to upsert user in Supabase:', error);
      }
    },
  },
});

export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/lib/supabase/server';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment.');
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  events: {
    async signIn({ user, account }) {
      if (!user.email) return;

      try {
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

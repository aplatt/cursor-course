import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

function buildClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — Supabase client is unavailable.'
    );
    return null;
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

export const supabase = buildClient();

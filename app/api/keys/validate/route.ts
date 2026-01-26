import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const key = typeof body?.key === 'string' ? body.key.trim() : '';

    if (!key) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key_value', key)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ valid: Boolean(data) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to validate API key' }, { status: 500 });
  }
}

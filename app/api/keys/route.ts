import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';

// GET - Fetch all API keys
export async function GET() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('id,name,key_value,created_at,last_used,key_type,monthly_limit,limit_enabled,is_active')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const keys = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    key: row.key_value,
    createdAt: row.created_at,
    lastUsed: row.last_used ?? undefined,
  }));

  return NextResponse.json(keys);
}

// POST - Create new API key
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, key, keyType, monthlyLimit, limitEnabled } = body;

    if (!name || !key) {
      return NextResponse.json(
        { error: 'Name and key are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        name,
        key_value: key,
        key_type: keyType ?? 'development',
        monthly_limit: limitEnabled ? Number(monthlyLimit || 0) : null,
        limit_enabled: Boolean(limitEnabled),
        is_active: true,
      })
      .select('id,name,key_value,created_at,last_used')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const newApiKey = {
      id: data.id,
      name: data.name,
      key: data.key_value,
      createdAt: data.created_at,
      lastUsed: data.last_used ?? undefined,
    };

    return NextResponse.json(newApiKey, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}


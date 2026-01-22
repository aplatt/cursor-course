import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';

// PUT - Update API key
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { name, key } = body;
    const { id } = await params;

    const { data, error } = await supabase
      .from('api_keys')
      .update({
        ...(name ? { name } : {}),
        ...(key ? { key_value: key } : {}),
      })
      .eq('id', id)
      .select('id,name,key_value,created_at,last_used')
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: data.id,
      name: data.name,
      key: data.key_value,
      createdAt: data.created_at,
      lastUsed: data.last_used ?? undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

// DELETE - Delete API key
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}


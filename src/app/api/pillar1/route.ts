// src/app/api/pillar1/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Pillar1Data } from '@/types/pillar1';
import { getUserFromCookiesOrAuth } from '@/lib/getUser'; // hypothetical

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = 'pillar1_data';

export async function GET(request: Request) {
  // CHANGE: example user-based approach
  const user = await getUserFromCookiesOrAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(data.pillarData, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getUserFromCookiesOrAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Pillar1Data;

    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        user_id: user.id,
        pillarData: body
      });

    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

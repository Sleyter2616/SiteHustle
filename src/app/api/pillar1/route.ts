import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Pillar1Data } from '@/types/pillar1';
import { getUserFromCookiesOrAuth } from '@/lib/getUser';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role key for admin access
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = 'pillar1_data';

export async function GET(request: Request) {
  const user = await getUserFromCookiesOrAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('pillar_data')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    // If no data found, return null
    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    // Return the pillar_data
    return NextResponse.json(data.pillar_data, { status: 200 });
  } catch (err: any) {
    console.error('Error fetching pillar1 data:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getUserFromCookiesOrAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pillarData = await request.json() as Pillar1Data;

    // Use RLS bypass with service role key
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        user_id: user.id,
        pillar_data: pillarData
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('Error saving pillar1 data:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

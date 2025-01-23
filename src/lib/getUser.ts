// src/lib/getUser.ts

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase'; // Adjust if you keep your Database definition elsewhere

/**
 * getUserFromCookiesOrAuth
 * Retrieves the authenticated user by reading cookies/session via Supabase.
 *
 * @param request - The incoming Request object (if needed)
 * @returns The user object or null if not authenticated
 */
export async function getUserFromCookiesOrAuth(request?: Request) {
  // If you need to use 'request' for something, you can, but generally
  // 'cookies()' is enough for Next.js server components with Supabase.
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    // Optionally throw or return null
    console.error('Error retrieving session:', error.message);
    return null;
  }

  if (!session?.user) {
    return null;
  }

  // session.user has { id, email, etc. }
  return session.user;
}

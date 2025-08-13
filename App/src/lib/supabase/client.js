import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.REACT_APP_SUPABASE_URL === "string" &&
  process.env.REACT_APP_SUPABASE_URL.length > 0 &&
  typeof process.env.REACT_APP_SUPABASE_ANON_KEY === "string" &&
  process.env.REACT_APP_SUPABASE_ANON_KEY.length > 0;

export function createClient() {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.");
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
        insert: () => ({
          select: () => Promise.resolve({ data: null, error: null }),
        }),
        update: () => ({
          eq: () => ({
            select: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: null }),
        }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
      },
    };
  }

  return createSupabaseClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
}

// Create a singleton instance for backward compatibility
export const supabase = createClient();

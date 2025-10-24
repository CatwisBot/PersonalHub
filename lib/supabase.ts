import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables at runtime (client-side)
if (typeof window !== 'undefined') {
  if (!supabaseUrl || supabaseUrl === '') {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  if (!supabaseAnonKey || supabaseAnonKey === '') {
    console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }
}

// Create Supabase client
// Use placeholder only during build time to prevent errors
const isValidConfig = supabaseUrl && supabaseAnonKey && 
                      supabaseUrl !== '' && supabaseAnonKey !== '';

export const supabase = createClient(
  isValidConfig ? supabaseUrl : 'https://placeholder.supabase.co',
  isValidConfig ? supabaseAnonKey : 'placeholder-key'
);

// Helper function to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
  );
}

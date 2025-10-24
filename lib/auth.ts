import { supabase } from "./supabase";

// Helper to check if Supabase is properly configured
function checkSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables are not configured');
    return false;
  }
  return true;
}

export interface SignUpData {
  nama: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  nama: string;
  email: string;
}

// Sign Up - Register user baru
export async function signUp({ nama, email, password }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nama, // Akan dipakai di trigger untuk create profile
      },
    },
  });

  if (error) throw error;
  return data;
}

// Sign In - Login user
export async function signIn({ email, password }: SignInData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Sign Out - Logout user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get Current User - Dapatkan user yang sedang login
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

// Get User Profile - Dapatkan profile user dari tabel profiles
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}

// Update User Profile - Update nama user
export async function updateUserProfile(userId: string, nama: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ nama })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

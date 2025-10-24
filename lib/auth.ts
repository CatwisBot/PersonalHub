import { supabase, isSupabaseConfigured } from "./supabase";

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
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

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
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }
    
    return data;
  } catch (error: any) {
    console.error('Sign in failed:', error);
    throw new Error(error.message || 'Failed to sign in. Please try again.');
  }
}

// Sign Out - Logout user
export async function signOut() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get Current User - Dapatkan user yang sedang login
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured');
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
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
